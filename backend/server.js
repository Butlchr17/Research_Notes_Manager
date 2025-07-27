require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');
const Redis = require('redis');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  port: 5432,
  database: 'research_notes'
});

// Redis connection for caching
const redisClient = Redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

// Test route
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

app.listen(port, () => {
    console.log('Server running on port' + port);
});

// Middleware to update timestamp
const updateTimestamp = 'UPDATE notes SET updated_at = CURRENT_TIMESTAMP WHERE id = $1';

// Cache key helper
const getCacheKey = (id) => 'note:' + id;

// GET all notes (with caching)
app.get('notes', async (req, res) => {
    const cacheKey = 'all_notes';
    let notes = await redisClient.get(cacheKey);
    if (notes) {
        return res.json(JSON.parse(notes));
    }
    try {
        const result = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
        notes = result.rows;
        await redisClient.set(cacheKey, JSON.stringify(notes), { EX: 60 }); // Cache for 1 min
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single note
app.get('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const cacheKey = getCacheKey(id);
    let note = await redisClient.get(cacheKey);
    if (note) {
        return res.json(JSON.parse(note));
    }
    try {
        const result = await pool.query('SELECT * FROM notes WHERE id = $1', [id]);
        if (result.rows.length === 0){
            return res.status(404).json({ error: 'Note not found' });
        }
        note = result.rows[0];
        await redisClient.set(cacheKey, JSON.stringify(note), { EX: 60 });
        res.json(note);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new note
app.post('/notes', async (req, res) => {
    const { title, content } = req.body;
    try {
        const result = await pool.query('INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *', [title, content]);
        await redisClient.del('all_notes') // Invalidate cache
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//PUT update note
app.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        await pool.query(updateTimestamp, [id]);
        const result = await pool.query('UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        await redisClient.del(getCacheKey(id));
        await redisClient.del('all_notes');
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE note
app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM notes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Note not found.' });
        }
        await redisClient.del(getCacheKey(id));
        await redisClient.del('all_notes');
        res.json({ message: 'Note deleted' });  
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
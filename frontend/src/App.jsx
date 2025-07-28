import React, {useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(()=> {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await axios.get('http://localhost:5000/notes');
        setNotes(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put('http://localhost:5000/notes/${editId}', { title, content });
            setEditId(null);
        }
        else {
            await axios.post('http://localhost:5000/notes', { title, content });
        }
        setTitle('');
        setContent('');
        fetchNotes();
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setContent(note.content);
        setEditId(note.id);
    };

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:5000/notes/${id}');
        fetchNotes();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Research Notes Manager</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 mr-2"
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
                    {editId ? 'Update' : 'Add'} Note
                </button>
            </form>
            <ul>
                {notes.map((note) => (
                    <li key={note.id} className="border p-2 mb-2 flex justify-between">
                        <div>
                            <h2 className="font-bold">{note.title}</h2>
                            <p>{note.content}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(note)} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>
                            <button onClick={() => handleDelete(note.id)} className="bg-red-500 text-white p-1">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
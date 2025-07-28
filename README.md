# Research Notes Manager

A full-stack web application for managing research notes, designed to streamline workflows for medical researchers. Built as preparation for a Fullstack Software Engineer role, this project showcases proficiency in full-stack development, databases, caching, AI-assisted coding, and containerization.

---

## Features

- **CRUD Operations** – Create, read, update, and delete notes with title, content, and timestamps  
- **Caching** – Utilizes Redis to cache frequent queries (e.g., fetching all notes)  
- **Responsive UI** – Built with React and Tailwind CSS for a modern, mobile-friendly interface  
- **Dark Mode** – Automatically adapts to system preferences  
- **Containerized** – Dockerized with Compose for easy deployment and portability  

---

## Tech Stack

**Frontend:**  
- React (with Vite)  
- Tailwind CSS  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- PostgreSQL (`pg` library)  
- Redis  

**DevOps & Tooling:**  
- Docker & Docker Compose  
- Git (version control)  
- AI tools (e.g., GitHub Copilot for code assistance)  

---

## Prerequisites

- Node.js (v22+ recommended)  
- npm  
- PostgreSQL and Redis installed locally (for development)  
- Docker & Docker Compose (for containerized setup)  

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Butlchr17/Research_Notes_Manager.git
cd Research_Notes_Manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DATABASE_URL=postgres://postgres:your_password@localhost:5432/research_notes
REDIS_URL=redis://localhost:6379
```

Then run:

```bash
# Create the PostgreSQL database
createdb research_notes

# Run the schema
psql -U postgres -d research_notes -f db-init.sql

# Start the backend server
node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser to use the app. (Ensure the backend is running.)

---

## Docker Setup

To run the project using Docker:

1. Ensure Docker and Docker Compose are installed  
2. Create a `.env` file in the root or use `backend/.env` with:

```env
POSTGRES_PASSWORD=your_password
```

3. Run the containers:

```bash
docker compose --env-file backend/.env up --build
```

Access the frontend at: [http://localhost](http://localhost)

To stop the containers:

```bash
docker compose down
```

---

## Usage

- **Add Note:** Enter a title and content, then submit  
- **Edit/Delete:** Use the buttons next to each note  
- **Caching:** Updates automatically invalidate Redis cache for freshness  

---

## Development Notes

- AI tools like GitHub Copilot assisted with code generation and refactoring  
- Agile-inspired workflow: PRs, pair programming simulation, and testing  
- Consider deploying to AWS ECS or another platform for portfolio enhancement  

---

## License

This project is licensed under the **MIT License** — feel free to use, fork, and modify.

---

## Research Notes Manager Project: Explanation

The Research Notes Manager is a complete full-stack web application designed to help researchers organize and manage notes. It simulates a tool for streamlining engineering processes by enabling efficient CRUD (Create, Read, Update, Delete) operations on notes, with features like caching for performance optimization and a responsive user interface. This project was developed as a guided programming task to prepare for a Fullstack Software Engineer role. It demonstrates key qualifications from the job description, including full-stack development, cloud-based tools, AI integration, agile practices, and portfolio building.

Below, I'll break down the project comprehensively: its purpose, features, architecture, code structure, development process, setup instructions, and future extensions.

## Purpose and Inspiration

This app addresses a hypothetical inefficiency in research workflows: manual note-taking that slows down collaboration and retrieval. By providing a scalable, secure platform for notes, it aligns with an emphasis on removing pain points through automation.

The project was built step-by-step, covering:

- Backend setup with APIs and caching.
- Database schema design.
- Frontend UI with React.
- Containerization for deployment.
  
It serves as a portfolio piece to showcase skills in problem-solving, collaboration (e.g., simulated pair programming), and presenting designs.

## Key Features

The app provides a simple yet powerful interface for managing notes:

- Create Notes: Users enter a title and content; the app saves it to the database with timestamps.

- Read Notes: Lists all notes in descending order of creation, with caching to reduce load times.

- Update Notes: Edit existing notes; updates timestamps and invalidates cache.

- Delete Notes: Remove notes and refresh the list automatically.

- Caching: Redis stores frequent queries (e.g., all notes) for 60 seconds, improving efficiency.

- Responsive Design: Tailwind CSS ensures the UI works on desktop/mobile, with dark mode support.

- Error Handling: Basic validation and API error responses (e.g., 404 for missing notes).

- Timestamps: Automatically tracks created/updated times, displayed in local format.

- No authentication is included, but it could be added with JWT in extensions.

## Tech Stack and Architecture

The app follows a classic full-stack architecture: client (frontend), server (backend), database, and cache. It's designed for scalability, security, and cost-effectiveness, as per the job requirements.

# Frontend:

 - React (with Vite for fast builds/hot reloading).

 - Tailwind CSS for styling (responsive, utility-first classes).

 - Axios for API requests.

 - State management: React hooks (useState, useEffect).

# Backend:

 - Node.js with Express.js for RESTful APIs.

 - PostgreSQL (SQL database) for persistent storage.

 - Redis for caching (invalidated on mutations).

 - pg library for database connections.

 - dotenv for environment variables.

 - DevOps & Cloud:

 - Docker for containerization.

 - Docker Compose for orchestration (multi-container setup).

 - Git for source control (with commits per step).

 - Simulated CI/CD (e.g., via GitHub Actions workflow).


# Data Flow:

1. Frontend sends API requests (e.g., POST /notes) via Axios.

2. Backend handles routes: Checks Redis cache; if miss, queries PostgreSQL.

3. Mutations (POST/PUT/DELETE) update DB and invalidate Redis keys.

4. Responses return JSON; frontend updates UI state.

In Docker, services communicate via internal network (e.g., db hostname).

Database Schema (from db-init.sql):

```bash
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notes_title ON notes(title);
```
 - Optimized with index for title searches.

The stack covers the following key qualifications: full-stack (React/Node), databases (SQL/NoSQL via Redis), DevOps (Docker/Kubernetes-ready), and AI (used for code prompts and troubleshooting with new software stacks).

## Code Structure

Project Root:

backend/: Server code, APIs, .env.

server.js: Express setup, routes, DB/Redis connections.

db-init.sql: Schema.

frontend/: React app.

src/App.jsx: Main component with CRUD logic.

src/main.jsx: React root.

src/index.css: Tailwind + custom styles.

tailwind.config.js, vite.config.js: Configs.

docker-compose.yml: Orchestration.

Dockerfiles: In backend/ and frontend/.

.gitignore: Ignores node_modules, .env, etc.

README.md: This doc.

API Endpoints (RESTful):

GET /notes: Fetch all (cached).

GET /notes/:id: Fetch one (cached).

POST /notes: Create.

PUT /notes/:id: Update.

DELETE /notes/:id: Delete.

Development Process

Built step-by-step with AI assistance (e.g., prompts for Express APIs, React components). Key practices:

 - AI Integration: Used tools like GitHub Copilot for generating/refining code (e.g., "Implement CRUD REST APIs with Redis caching").
 - Agile: Committed per step (e.g., "Initialized backend"), simulated code reviews/pair programming.
 - Testing: Manual (curl/Postman for APIs, browser for UI); add Jest/Vitest for unit tests.
 - Challenges Overcome: Setup issues (e.g., PostgreSQL auth, Tailwind v4 config) resolved via troubleshooting.
 - Portfolio Focus: GitHub-ready with commits, README, Docker for easy demo.

# Setup and Running

See the README.md content above for detailed instructions (local and Docker).

## Extensions/Future Work

- Authentication (JWT/OAuth).
- User roles (e.g., researcher vs. admin).
- Search/filter notes.
- Deploy to AWS (ECS/EC2 with RDS/ElastiCache).
- CI/CD pipeline (GitHub Actions for tests/deploy).
- Analytics (track note usage).

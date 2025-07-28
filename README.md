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

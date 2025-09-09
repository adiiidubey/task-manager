# Task Manager (MERN Stack)

A clean, responsive Task Manager web app built with MongoDB, Express, React (Vite) and Node.js.  
Manage tasks with create/read/update/delete, status filtering, and viewport-safe dropdowns for a polished UX.

---

## Key Features

- Add, edit and remove tasks
- Task status: pending, in-progress, done
- Status filters and persistent UI state
- Tailwind CSS for responsive UI

---

## Quick Start (Windows)

Prerequisites

- Node.js , npm
- MongoDB (local or Atlas)

1. Backend

   - Open terminal
   - cd backend
   - npm install
   - create `.env` with:
     ```
     MONGO_URI=mongodb://localhost:27017/tasks-db
     PORT=4000
     ```
   - Start server:
     - npm run dev (or npm start)

2. Frontend
   - Open a new terminal
   - cd frontend
   - npm install
   - create `.env` with:
     ```
     VITE_API_URL=http://localhost:4000
     ```
   - Start dev server:
     - npm run dev
   - Open: http://localhost:5173

---

## Folder Structure

```text
task-manager/
├── backend/
│   ├── src/
│   │   ├── models/        (Mongoose models)
│   │   └── routes/        (Express routes)
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/            (static assets)
│   ├── src/
│   │   ├── components/    (TaskForm.jsx, TaskList.jsx, ...)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
└── [Readme.md]
```

## API

- GET /api/tasks — list tasks (?status=...)
- GET /api/tasks/:id
- POST /api/tasks — create { title, description, status }
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

## Important files

- backend/src/models/task.model.js — Task schema (title, description, status, timestamps)
- backend/src/routes/taskRoutes.js — CRUD endpoints for /api/tasks
- backend/server.js — Server bootstrap and DB connection
- frontend/src/components/TaskForm.jsx — Create task form; portal dropdown
- frontend/src/components/TaskList.jsx — List, edit, delete tasks; anchored dropdowns
- frontend/src/App.jsx — Top-level state and data fetching

## Screenshots

<p align="center">
  <picture>
    <!-- large screens -->
    <h1>For Large Screens</h1>
    <img src="/frontend/src/assets/screenshot-1.png" alt="Task Manager preview" style="max-width:100%; height:auto; border-radius:8px;">
    <!-- small screens (fallback) -->
    <br/>
    <h1>For Small Screens</h1>
    <img src="/frontend/src/assets/screenshot-2.png" alt="Task Manager preview" style="max-width:100%; height:auto; border-radius:8px;">
  </picture>
</p>


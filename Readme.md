# ✅ Task Manager (MERN Stack)

A simple, responsive Task Manager web app built with MongoDB, Express, React and Node.js.  
Add, edit, delete and filter tasks. Designed for clarity and easy local development.

Table of contents

- Project overview
- Folder structure (clickable file links below)
- Important files
- Run locally
- API & notes

Project overview
A small MERN app that demonstrates a CRUD API (Express + MongoDB) and a React (Vite) frontend
with Tailwind styling and accessible, portal-backed dropdowns for status selection.

Folder structure
task-manager/
├── backend/
│ ├── src/
│ │ ├── models/
│ │ │ └── task.model.js
│ │ └── routes/
│ │ └── taskRoutes.js
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── public/
│ │ └── (static assets)
│ ├── src/
│ │ ├── components/
│ │ │ ├── TaskForm.jsx
│ │ │ └── TaskList.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── vite.config.js
│ ├── package.json
│ └── .env
└── README.md

Important files (click to open)

- Backend

  - [backend/src/models/task.model.js](backend/src/models/task.model.js) — Mongoose Task model (title, description, status)
  - [backend/src/routes/taskRoutes.js](backend/src/routes/taskRoutes.js) — CRUD API routes for tasks
  - [backend/server.js](backend/server.js) — Express server entry, loads .env and connects to MongoDB

- Frontend
  - [frontend/src/components/TaskForm.jsx](frontend/src/components/TaskForm.jsx) — Create task form with portal dropdown
  - [frontend/src/components/TaskList.jsx](frontend/src/components/TaskList.jsx) — Task list, edit/update/delete UI
  - [frontend/src/App.jsx](frontend/src/App.jsx) — Main React app and task fetching/filtering
  - [frontend/vite.config.js](frontend/vite.config.js) — Vite + Tailwind setup

Run locally (quick)

1. Backend

   - cd backend
   - npm install
   - copy .env.example -> .env and set MONGO_URI and PORT
   - npm run dev (or npm start)

2. Frontend
   - cd frontend
   - npm install
   - copy .env.example -> .env and set VITE_API_PORT (default 4000)
   - npm run dev
   - Open http://localhost:5173

API overview

- GET /api/tasks — list tasks (optional ?status=pending|in-progress|done)
- GET /api/tasks/:id — get a single task
- POST /api/tasks — create task
- PUT /api/tasks/:id — update task
- DELETE /api/tasks/:id — delete task

Notes

- Frontend uses portal-mounted dropdowns for status options so options are not clipped by surrounding layout.
- Tailwind is used for styling; adjust tailwind config in vite.config.js if needed.

License / attribution

- Project scaffolded for demonstration. Update README with your license and contributors as

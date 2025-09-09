# ✅ Task Manager (MERN Stack)

A modern and responsive Task Manager Web App built with the MERN stack (MongoDB, Express, React, Node.js).  
Add, edit, delete and filter tasks with a clean UI.

---

## 📂 Folder structure

task-manager/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── [`Task` model`](backend/src/models/task.model.js)
│   │   └── routes/
│   │       └── [`taskRoutes`](backend/src/routes/taskRoutes.js)
│   ├── [`server.js`](backend/server.js)
│   └── [`package.json`](backend/package.json)
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── [`TaskForm.jsx`](frontend/src/components/TaskForm.jsx)
│   │   │   └── [`TaskList.jsx`](frontend/src/components/TaskList.jsx)
│   │   ├── [`App.jsx`](frontend/src/App.jsx)
│   │   ├── [`main.jsx`](frontend/src/main.jsx)
│   │   └── [`index.css`](frontend/src/index.css)
│   ├── [`vite.config.js`](frontend/vite.config.js)
│   ├── [`package.json`](frontend/package.json)
│   └── [`.env`](frontend/.env)
│
└── [`Readme.md`](Readme.md)

---

## About the application

- Frontend
  - React + Hooks with functional components ([`App.jsx`](frontend/src/App.jsx)).
  - Tailwind CSS used for styling ([`index.css`](frontend/src/index.css) and [`vite.config.js`](frontend/vite.config.js)).
  - Lucide icons used in UI components ([`TaskForm.jsx`](frontend/src/components/TaskForm.jsx), [`TaskList.jsx`](frontend/src/components/TaskList.jsx)).

- Backend
  - Express API with standard CRUD routes defined in [`taskRoutes`](backend/src/routes/taskRoutes.js).
  - MongoDB + Mongoose for persistence with the [`Task` model](backend/src/models/task.model.js).
  - Server entry in [`server.js`](backend/server.js).

---

## API (overview)

- GET /api/tasks — list tasks (optional ?status=pending|in-progress|done) — implemented in [`taskRoutes`](backend/src/routes/taskRoutes.js)  
- GET /api/tasks/:id — get single task — [`taskRoutes`](backend/src/routes/taskRoutes.js)  
- POST /api/tasks — create task — [`taskRoutes`](backend/src/routes/taskRoutes.js)  
- PUT /api/tasks/:id — update task — [`taskRoutes`](backend/src/routes/taskRoutes.js)  
- DELETE /api/tasks/:id — delete task — [`taskRoutes`](backend/src/routes/taskRoutes.js)

Model: [`Task`](backend/src/models/task.model.js) with fields: title (required), description, status (pending | in-progress | done).

---

## Environment

- Backend: set MONGO_URI and PORT in backend `.env` (loaded in [`server.js`](backend/server.js)).  
- Frontend: [`frontend/.env`](frontend/.env) contains VITE_API_PORT (default 4000) used by the client.

---

## Run locally

1. Backend
   - cd backend
   - install: npm install
   - dev: npm run dev (uses nodemon) or npm run server to run node server
   - Entry: [`server.js`](backend/server.js)

2. Frontend
   - cd frontend
   - install: npm install
   - dev: npm run dev
   - Open: http://localhost:5173 (Vite default) — API calls target port in [`frontend/.env`](frontend/.env)

---

## Notes & references

- Main backend files: [`server.js`](backend/server.js), [`taskRoutes`](backend/src/routes/taskRoutes.js), [`Task` model](backend/src/models/task.model.js).  
- Main frontend files: [`App.jsx`](frontend/src/App.jsx), [`TaskForm.jsx`](frontend/src/components/TaskForm.jsx), [`TaskList.jsx`](frontend/src/components/TaskList.jsx), [`vite.config.js`](frontend/vite.config.js).

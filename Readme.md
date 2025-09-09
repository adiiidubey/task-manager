# ✅ Task Manager (MERN Stack)

A modern and responsive **Task Manager Web App** built with the **MERN stack** (MongoDB, Express, React, Node.js).  
It allows users to **add, edit, delete, filter, and manage tasks** with a clean UI and persistent filters.

---

## 📂 Project Structure

task-manager/
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── models/ # MongoDB Mongoose models
│ │ └── routes/ # Express API routes (CRUD for tasks)
│ │
│ ├── server.js # Backend entry point
│ └── package.json
│
├── frontend/ # React + Tailwind frontend
│ ├── src/
│ │ ├── components/ # TaskForm, TaskList
│ │ ├── App.js # Main React component
│ │ └── index.js
│ └── package.json
│
└── README.md # Project documentation

---

## ✨ Features

- 📌 Create new tasks with **title, description, and status**  
- 📝 Edit tasks inline with modern UI  
- ❌ Delete tasks with confirmation  
- 🔍 Filter tasks by **All | Pending | In Progress | Done**  
- 💾 Last selected filter is saved in **localStorage**  
- 🎨 Stylish UI with **Tailwind CSS + gradient themes**  
- ⚡ Fully responsive (desktop, tablet, mobile)  

---

## 🛠️ Tech Stack

**Frontend**
- React (with Hooks & functional components)  
- Tailwind CSS  
- Lucide Icons  

**Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager

// frontend/src/components/TaskForm.js
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      setTitle("");
      setDescription("");
      setStatus("pending");
      setError("");
      refreshTasks();
    } catch (err) {
      console.error(err);
      setError("Error creating task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800/70 backdrop-blur-md border border-gray-700 
                 p-6 rounded-2xl shadow-xl max-w-lg mx-auto hover:shadow-2xl transition"
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-5 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-violet-400" />
        Create New Task
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 
                     text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
          placeholder="Enter task title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 
                     text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none resize-none"
          placeholder="Enter description (optional)"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-4 py-2 rounded-xl bg-gray-900 border border-gray-700 
                     text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
        >
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🚀 In Progress</option>
          <option value="done">✅ Done</option>
        </select>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 
                   bg-gradient-to-r from-violet-500 to-indigo-600 text-white 
                   font-medium px-4 py-2 rounded-xl shadow-lg hover:opacity-90 
                   active:scale-95 transition"
      >
        <PlusCircle className="w-5 h-5" />
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;

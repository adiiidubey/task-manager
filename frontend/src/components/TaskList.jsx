// frontend/src/components/TaskList.js
import React, { useState } from "react";
import { Pencil, Trash2, Save, XCircle } from "lucide-react";

function TaskList({ tasks, refreshTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("pending");

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(task.status);
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus("pending");
  };

  const handleUpdate = async (id) => {
    if (!editTitle.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
          status: editStatus,
        }),
      });

      if (!res.ok) throw new Error("Failed to update task");
      setEditingTaskId(null);
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      refreshTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors = {
    pending: "bg-yellow-500/20 text-yellow-300 border border-yellow-600",
    "in-progress": "bg-indigo-500/20 text-indigo-300 border border-indigo-600",
    done: "bg-green-500/20 text-green-300 border border-green-600",
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 italic">
          No tasks yet. Start by adding one!
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gray-800/70 backdrop-blur-md border border-gray-700 
                       p-5 rounded-2xl shadow-md hover:shadow-xl transition-all"
          >
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full mb-2 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 
                             text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full mb-2 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 
                             text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none resize-none"
                  rows={2}
                />
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full mb-3 px-3 py-2 rounded-xl bg-gray-900 border border-gray-700 
                             text-gray-100 focus:ring-2 focus:ring-violet-500 outline-none"
                >
                  <option value="pending">⏳ Pending</option>
                  <option value="in-progress">🚀 In Progress</option>
                  <option value="done">✅ Done</option>
                </select>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(task._id)}
                    className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 
                               text-white px-4 py-2 rounded-xl shadow-md hover:opacity-90 active:scale-95 transition"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 bg-gray-700 text-gray-300 
                               px-4 py-2 rounded-xl hover:bg-gray-600 active:scale-95 transition"
                  >
                    <XCircle className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100">
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-gray-400 mt-1">{task.description}</p>
                    )}
                    <span
                      className={`inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full ${
                        statusColors[task.status]
                      }`}
                    >
                      {task.status === "pending" && "⏳ Pending"}
                      {task.status === "in-progress" && "🚀 In Progress"}
                      {task.status === "done" && "✅ Done"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-600 
                                 text-white px-3 py-1 rounded-xl shadow hover:opacity-90 active:scale-95 transition"
                    >
                      <Pencil className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-600 
                                 text-white px-3 py-1 rounded-xl shadow hover:opacity-90 active:scale-95 transition"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;

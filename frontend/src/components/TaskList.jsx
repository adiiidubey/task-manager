import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil, Trash2, Save, XCircle, Check } from "lucide-react";

const statusOptions = [
  { value: "pending", label: "⏳ Pending" },
  { value: "in-progress", label: "🚀 In Progress" },
  { value: "done", label: "✅ Done" },
];

function TaskList({ tasks, refreshTasks }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState(statusOptions[0]);

  const buttonRef = useRef(null);
  const optionsRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    minWidth: "auto",
    transformOrigin: "top center",
  });

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditStatus(statusOptions.find((opt) => opt.value === task.status));
  };

  const handleCancel = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
    setEditStatus(statusOptions[0]);
  };

  const handleUpdate = async (id) => {
    if (!editTitle.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:${import.meta.env.VITE_API_PORT}/api/tasks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription,
            status: editStatus.value,
          }),
        }
      );
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
      const res = await fetch(
        `http://localhost:${import.meta.env.VITE_API_PORT}/api/tasks/${id}`,
        { method: "DELETE" }
      );
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

  useLayoutEffect(() => {
    if (!dropdownOpen) return;

    const update = () => {
      const btn = buttonRef.current;
      const opts = optionsRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();

      const estimatedOptionHeight = 40;
      const estimatedHeight = statusOptions.length * estimatedOptionHeight + 8;

      const actualHeight = opts ? opts.offsetHeight : estimatedHeight;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const openUp = actualHeight > spaceBelow && spaceAbove > spaceBelow;

      const top = openUp
        ? Math.max(8, rect.top - actualHeight)
        : Math.min(window.innerHeight - 8 - actualHeight, rect.bottom);
      const left = rect.left;
      const minWidth = Math.max(rect.width, 160);

      setDropdownStyle({
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        minWidth: `${Math.round(minWidth)}px`,
        transformOrigin: openUp ? "bottom center" : "top center",
      });
    };

    update();

    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, [dropdownOpen, editStatus, statusOptions.length]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e) => {
      const target = e.target;
      if (
        !buttonRef.current?.contains(target) &&
        !optionsRef.current?.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

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
                       p-5 rounded-2xl shadow-md hover:shadow-xl transition-all relative"
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

                <div className="mb-3">
                  <div className="relative">
                    <button
                      ref={buttonRef}
                      onClick={() => setDropdownOpen((s) => !s)}
                      type="button"
                      className="w-full flex justify-between items-center px-3 py-2 rounded-xl 
                                 bg-gray-900 border border-gray-700 text-gray-100 
                                 focus:ring-2 focus:ring-violet-500 outline-none"
                    >
                      {editStatus.label}
                      <span>
                        <svg
                          className={`w-4 h-4 text-gray-400 transform transition-transform ${
                            dropdownOpen ? "rotate-180" : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </button>

                    {dropdownOpen &&
                      createPortal(
                        <div
                          ref={optionsRef}
                          role="listbox"
                          aria-activedescendant={editStatus?.value}
                          className="z-50"
                          style={{
                            position: "fixed",
                            top: dropdownStyle.top,
                            left: dropdownStyle.left,
                            minWidth: dropdownStyle.minWidth,
                            maxHeight: "60vh",
                            overflowY: "auto",
                            borderRadius: 12,
                            boxShadow:
                              "0 8px 20px rgba(2,6,23,0.7), 0 2px 4px rgba(0,0,0,0.6)",
                            background: "rgba(17, 24, 39, 1)",
                            border: "1px solid rgba(55,65,81,1)",
                            padding: "4px",
                            transition:
                              "opacity 160ms ease, transform 160ms ease",
                            transformOrigin: dropdownStyle.transformOrigin,
                          }}
                        >
                          {statusOptions.map((option) => {
                            const isSelected =
                              option.value === editStatus.value;
                            return (
                              <div
                                key={option.value}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setEditStatus(option);
                                  setDropdownOpen(false);
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setEditStatus(option);
                                    setDropdownOpen(false);
                                  }
                                }}
                                tabIndex={0}
                                className={`cursor-pointer px-4 py-2 flex justify-between items-center rounded-md ${
                                  isSelected
                                    ? "bg-violet-700/60 text-white"
                                    : "text-gray-300 hover:bg-gray-800"
                                }`}
                              >
                                <span>{option.label}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 text-violet-300" />
                                )}
                              </div>
                            );
                          })}
                        </div>,
                        document.body
                      )}
                  </div>
                </div>

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

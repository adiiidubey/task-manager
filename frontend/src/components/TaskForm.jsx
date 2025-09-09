
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { PlusCircle, ChevronDown, Check } from "lucide-react";

const statusOptions = [
  { value: "pending", label: "⏳ Pending" },
  { value: "in-progress", label: "🚀 In Progress" },
  { value: "done", label: "✅ Done" },
];

function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(statusOptions[0]);
  const buttonRef = useRef(null);
  const optionsRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({
    top: 0,
    left: 0,
    minWidth: "auto",
    transformOrigin: "top center",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:${import.meta.env.VITE_API_PORT}/api/tasks`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            status: status.value,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to create task");

      setTitle("");
      setDescription("");
      setStatus(statusOptions[0]);
      setError("");
      refreshTasks();
    } catch (err) {
      console.error(err);
      setError("Error creating task");
    }
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
  }, [dropdownOpen, statusOptions.length]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e) => {
      const target = e.target;
      if (!buttonRef.current?.contains(target) && !optionsRef.current?.contains(target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [dropdownOpen]);

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

      {/* Title */}
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

      {/* Description */}
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

      {/* Status Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Status
        </label>

        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setDropdownOpen((s) => !s)}
            className={`w-full flex justify-between items-center px-4 py-2 rounded-xl 
                        bg-gray-900 border border-gray-700 text-gray-100 
                        focus:ring-2 focus:ring-violet-500 outline-none`}
          >
            <span>{status.label}</span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transform transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {dropdownOpen &&
            createPortal(
              <div
                ref={optionsRef}
                role="listbox"
                aria-activedescendant={status?.value}
                className="z-50"
                style={{
                  position: "fixed",
                  top: dropdownStyle.top,
                  left: dropdownStyle.left,
                  minWidth: dropdownStyle.minWidth,
                  maxHeight: "60vh",
                  overflowY: "auto",
                  borderRadius: 12,
                  boxShadow: "0 8px 20px rgba(2,6,23,0.7), 0 2px 4px rgba(0,0,0,0.6)",
                  background: "rgba(17, 24, 39, 1)",
                  border: "1px solid rgba(55,65,81,1)",
                  padding: "4px",
                  transition: "opacity 160ms ease, transform 160ms ease",
                  transformOrigin: dropdownStyle.transformOrigin,
                }}
              >
                {statusOptions.map((option) => {
                  const isSelected = option.value === status.value;
                  return (
                    <div
                      key={option.value}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setStatus(option);
                        setDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setStatus(option);
                          setDropdownOpen(false);
                        }
                      }}
                      tabIndex={0}
                      className={`cursor-pointer px-4 py-2 flex justify-between items-center rounded-md ${
                        isSelected ? "bg-violet-700/60 text-white" : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-violet-300" />}
                    </div>
                  );
                })}
              </div>,
              document.body
            )}
        </div>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {/* Submit Button */}
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

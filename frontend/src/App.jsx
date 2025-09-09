import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { CheckSquare } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(
    localStorage.getItem("taskFilter") || "all"
  );

  const fetchTasks = async () => {
    try {
      let url = `http://localhost:${import.meta.env.VITE_API_PORT}/api/tasks`;
      if (filter !== "all") {
        url += `?status=${filter}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    localStorage.setItem("taskFilter", newFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-900/70 backdrop-blur-lg shadow-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-2">
          <CheckSquare className="w-7 h-7 text-violet-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Task Manager
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <TaskForm refreshTasks={fetchTasks} />

        {/* Filter Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex rounded-xl overflow-hidden bg-gray-800/70 backdrop-blur-md border border-gray-700 shadow-lg">
            {["all", "pending", "in-progress", "done"].map((status) => (
              <button
                key={status}
                className={`px-5 py-2 text-sm font-medium transition-all duration-200 ${
                  filter === status
                    ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
                onClick={() => handleFilterChange(status)}
              >
                {status === "all" && "📋 All"}
                {status === "pending" && "⏳ Pending"}
                {status === "in-progress" && "🚀 In Progress"}
                {status === "done" && "✅ Done"}
              </button>
            ))}
          </div>
        </div>

        <TaskList tasks={tasks} refreshTasks={fetchTasks} />
      </main>
    </div>
  );
}

export default App;

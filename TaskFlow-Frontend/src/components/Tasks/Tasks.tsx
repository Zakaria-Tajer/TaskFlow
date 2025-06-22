import { useState } from "react";
import Header from "./Header";
import { TaskForm } from "../Task-form";
import { CheckSquare, LayoutGrid, List } from "lucide-react";
import type { Task } from "../../api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState("list");

  const handleAddTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">All Tasks</h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-gray-200"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 border-l border-gray-300 ${
                    viewMode === "grid"
                      ? "bg-gray-200"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <TaskForm onAddTask={handleAddTask} />
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-0"
            }
          >
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <CheckSquare className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-600">
                {/* {searchQuery
                    ? "Try adjusting your search terms"
                    : "Create your first task to get started"} */}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tasks;

import { useMemo, useState } from "react";
import Header from "./Header";
import { CheckSquare, Filter, LayoutGrid, List, Search, X } from "lucide-react";
import TaskForm from "./Task-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteTask,
  getAllTasks,
  updateTask,
  type Task,
} from "../../api/tasks";
import Loading from "../Loading";
import { TaskCard } from "./Task-card";

type FilterState = {
  status: string;
  priority: string;
  search: string;
};

function Tasks() {
  const [viewMode, setViewMode] = useState("list");
  const queryClient = useQueryClient();

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["getTasks"],
    queryFn: getAllTasks,
  });

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      console.log("✅ update success:", data);
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      console.log("✅ delete success:", data);
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
  });

  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    priority: "all",
    search: "",
  });

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task: Task) => {
      // Status filter
      if (
        filters.status !== "all" &&
        task.status?.toLowerCase() !== filters.status.toLowerCase()
      ) {
        return false;
      }

      // Priority filter
      if (
        filters.priority !== "all" &&
        task.priority?.toLowerCase() !== filters.priority.toLowerCase()
      ) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = task.title?.toLowerCase().includes(searchTerm);
        const descriptionMatch = task.description
          ?.toLowerCase()
          .includes(searchTerm);
        if (!titleMatch && !descriptionMatch) {
          return false;
        }
      }

      return true;
    });
  }, [tasks, filters]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: "all",
      priority: "all",
      search: "",
    });
  };

  const hasActiveFilters =
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.search !== "";

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden mb-10">
      <Header />

      <main className="flex-1 sm:flex-1 scrollbar-medium rounded-xl bg-white md:w-2/3 md:mx-auto md:my-7 overflow-scroll h-screen pb-32 p-6 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">All Tasks</h2>
              <p className="text-gray-600 mt-1">
                {filteredTasks.length} of {tasks?.length || 0} tasks
                {hasActiveFilters && " (filtered)"}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-5">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                    showFilters || hasActiveFilters
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  {hasActiveFilters && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {
                        [
                          filters.status !== "all",
                          filters.priority !== "all",
                          filters.search !== "",
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </button>
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
          </div>

          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Filter Tasks</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={filters.search}
                      onChange={(e) =>
                        handleFilterChange("search", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) =>
                      handleFilterChange("status", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                {/* Priority Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <select
                    value={filters.priority}
                    onChange={(e) =>
                      handleFilterChange("priority", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          <div className="mb-6">
            <TaskForm />
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "space-y-0"
            }
          >
            {filteredTasks && filteredTasks.length > 0 ? (
              filteredTasks.map((task: Task) => (
                <TaskCard
                  onTaskEdit={() => {}}
                  onTaskDelete={() => deleteTaskMutate(task.id as number)}
                  onTaskCheckUpdate={(status) => {
                    updateTaskMutate({
                      description: task.description,
                      dueDate: task.dueDate,
                      priority: task.priority,
                      status: status,
                      title: task.title,
                      id: task.id,
                    });
                  }}
                  key={task.id}
                  task={task}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <CheckSquare className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {hasActiveFilters
                    ? "No tasks match your filters"
                    : "No tasks found"}
                </h3>
                <p className="text-gray-600">
                  {hasActiveFilters ? (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Clear filters to see all tasks
                    </button>
                  ) : (
                    "Create your first task to get started!"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Tasks;

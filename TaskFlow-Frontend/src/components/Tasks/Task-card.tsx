import { Calendar, Edit3, Flag, MoreHorizontal, Trash2 } from "lucide-react";
import type { Task } from "../../api/tasks";
import { useEffect, useRef, useState } from "react";
import TaskUpdate from "./TaskUpdate";

type TaskCardProps = {
  task: Task;
  onTaskCheckUpdate?: (newStatus: string) => void;
  onTaskEdit?: (task: Task) => void;
  onTaskDelete?: (taskId: number) => void;
};

export function TaskCard({
  task,
  onTaskCheckUpdate,
  onTaskEdit,
  onTaskDelete,
}: TaskCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const onToggleComplete = (taskStatus: string) => {
    if (onTaskCheckUpdate) {
      onTaskCheckUpdate(taskStatus);
    }
  };

  const handleEdit = () => {
    if (onTaskEdit) {
      onTaskEdit(task);
    }
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleSaveTask = (updatedTask: Task) => {
    if (onTaskEdit) {
      onTaskEdit(updatedTask);
    }
  };

  const handleDelete = () => {
    if (onTaskDelete) {
      onTaskDelete(task.id as number);
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "done":
        return "bg-green-50 text-green-700 border-green-200";
      case "in-progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "todo":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <div className="group mb-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className="relative">
              <input
                type="checkbox"
                checked={task.status.toLocaleLowerCase() === "done"}
                onChange={() =>
                  onToggleComplete(String("done").toLocaleUpperCase())
                }
                className="h-5 w-5 text-blue-600 bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 transition-colors cursor-pointer hover:border-blue-400"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-base leading-tight mb-2 ${
                  task.status.toLocaleLowerCase() === "done"
                    ? "line-through text-gray-400"
                    : "text-gray-900 group-hover:text-gray-700"
                }`}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`text-sm leading-relaxed mb-3 ${
                    task.status === "done" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {task.description}
                </p>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <Flag className="w-3 h-3 mr-1.5" />
                  {task.priority}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status.replace("-", " ")}
                </span>
              </div>

              {task.dueDate && (
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  <span className="font-medium">{task.dueDate as string}</span>
                </div>
              )}
            </div>
          </div>

          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 ml-2"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 animate-in fade-in-0 zoom-in-95 duration-100">
                <button
                  disabled={task.status.toLowerCase() === "done"}
                  onClick={handleEdit}
                  className={`w-full flex items-center px-4 py-2.5 text-sm transition-colors duration-150 group/item ${
                    task.status.toLowerCase() === "done"
                      ? "text-gray-400 cursor-not-allowed bg-gray-50"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <Edit3
                    className={`w-4 h-4 mr-3 transition-colors ${
                      task.status.toLowerCase() === "done"
                        ? "text-gray-300"
                        : "text-gray-400 group-hover/item:text-blue-500"
                    }`}
                  />
                  <span className="font-medium">
                    {task.status.toLowerCase() === "done"
                      ? "Task Completed"
                      : "Update Task"}
                  </span>
                </button>

                <div className="h-px bg-gray-100 mx-2 my-1"></div>
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-150 group/item"
                >
                  <Trash2 className="w-4 h-4 mr-3 text-gray-400 group-hover/item:text-red-500" />
                  <span className="font-medium">Delete Task</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskUpdate
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
      />
    </>
  );
}

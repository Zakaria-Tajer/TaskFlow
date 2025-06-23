import { Calendar, FileText, Flag, Tag, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createTask, updateTask, type Task } from "../../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateTask } from "./Schema";

type TaskUpdateProps = {
  task?: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: Task) => void;
  mode?: "create" | "edit";
};

type ValidationErrors = {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate?: string;
};
function TaskUpdate({ task, isOpen, onClose, mode = "edit" }: TaskUpdateProps) {
  const queryClient = useQueryClient();
  const isCreateMode = mode === "create" || !task;
  const [errors, setErrors] = useState<ValidationErrors>();

  const getTodayDate = (): string => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    status: "PENDING",
    dueDate: "",
  });

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      console.log("✅ Task created successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      console.log("✅ Task updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
      onClose();
    },
  });

  useEffect(() => {
    if (isCreateMode) {
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        status: "PENDING",
        dueDate: "",
      });
    } else if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "MEDIUM",
        status: task.status || "PENDING",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [task, isCreateMode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = await validateTask(formData as Task);

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    if (isCreateMode) {
      createMutation.mutate({
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate,
      });
    } else {
      const updatedTask: Task = {
        ...task!,
        title: formData.title.trim(),
        description: formData.description.trim(),
        priority: formData.priority,
        status: formData.status,
        dueDate: formData.dueDate,
      };
      updateMutation.mutate(updatedTask);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  const status: string[] = ["PENDING", "ONGOING", "DONE"];
  const priority: string[] = ["LOW", "MEDIUM", "HIGH"];
  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isCreateMode ? "Create New Task" : "Update Task"}
          </h2>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* //Form rem */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label
              htmlFor="title"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <FileText className="w-4 h-4 mr-2" />
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
              placeholder="Enter task title..."
            />
            {errors?.title && (
              <p className="text-red-700 font-medium text-sm mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <FileText className="w-4 h-4 mr-2" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
              placeholder="Enter task description..."
            />
            {errors?.description && (
              <p className="text-red-700 font-medium text-sm mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="priority"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Flag className="w-4 h-4 mr-2" />
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
              >
                {priority.map((p) => (
                  <option key={p} value={p}>
                    {p.charAt(0) + p.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors?.priority && (
                <p className="text-red-700 font-medium text-sm mt-1">
                  {errors.priority}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="status"
                className="flex items-center text-sm font-medium text-gray-700 mb-2"
              >
                <Tag className="w-4 h-4 mr-2" />
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
              >
                {status.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              {errors?.status && (
                <p className="text-red-700 font-medium text-sm mt-1">
                  {errors.status}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="dueDate"
              className="flex items-center text-sm font-medium text-gray-700 mb-2"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={getTodayDate()}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
            />
            {errors?.dueDate && (
              <p className="text-red-700 font-medium text-sm mt-1">
                {errors.dueDate}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? isCreateMode
                  ? "Creating..."
                  : "Updating..."
                : isCreateMode
                ? "Create Task"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskUpdate;

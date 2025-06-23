import type React from "react";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { createTask, type Task } from "../api/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function TaskForm() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      console.log("✅ Signup success:", data);
      queryClient.invalidateQueries({ queryKey: ["getTasks"] });
    },
  });

  const formatDateToLocalDateTime = (date: Date) => {
    return date.toISOString().split(".")[0];
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Task>({
    title: "",
    description: "",
    priority: "",
    status: "",
    dueDate: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    mutate({
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formatDateToLocalDateTime(new Date(formData.dueDate)),
      status: formData.status,
    });

    setOpen(false);
  };

  const status: string[] = ["pending", "ongoing", "done"];
  const priority: string[] = ["low", "medium", "high"];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-gray-400/50 flex items-center justify-center p-4 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Create New Task</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter task title..."
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Add task description..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="priority"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {priority.map((priority: string, i: number) => (
                      <option key={i} value={priority.toLocaleUpperCase()}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {status.map((status: string, i: number) => (
                      <option key={i} value={status.toLocaleUpperCase()}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate as string}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskForm;

import { useState } from "react";
import { Plus } from "lucide-react";
import TaskUpdate from "./TaskUpdate";

function TaskForm() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Task
      </button>

      <TaskUpdate
        mode="create"
        isOpen={isCreateModalOpen}
        onSave={() => {}}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}

export default TaskForm;

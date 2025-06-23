import { Calendar, Flag, MoreHorizontal } from "lucide-react";
import type { Task } from "../../api/tasks";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const onToggleComplete = (id: number) => {
    console.log(id);
  };
  return (
    <div className="mb-3 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={() => onToggleComplete(task.id as number)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium text-sm ${
                task.status === "done" ? "line-through text-gray-500" : ""
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-xs text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="flex items-center space-x-2 mt-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border `}
              >
                <Flag className="w-3 h-3 mr-1" />
                {task.priority}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border `}
              >
                {/* {task!.status.replace("-", " ")} */}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border bg-gray-100 text-gray-800">
                {task.status}
              </span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              {task.dueDate && (
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {task.dueDate as string}
                </div>
              )}
              {/* {task.assignee && (
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {task.assignee}
                </div>
              )} */}
            </div>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

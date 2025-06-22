import {
  CheckSquare,
  Clock,
  Calendar,
  Briefcase,
  User,
  ShoppingCart,
  Heart,
  Filter,
  Plus,
} from "lucide-react";

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  taskCounts: {
    all: number;
    todo: number;
    inProgress: number;
    completed: number;
    work: number;
    personal: number;
    shopping: number;
    health: number;
  };
}

export function Sidebar({
  activeFilter,
  onFilterChange,
  taskCounts,
}: SidebarProps) {
  const menuItems = [
    { id: "all", label: "All Tasks", icon: CheckSquare, count: taskCounts.all },
    { id: "todo", label: "To Do", icon: Clock, count: taskCounts.todo },
    {
      id: "in-progress",
      label: "In Progress",
      icon: Calendar,
      count: taskCounts.inProgress,
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckSquare,
      count: taskCounts.completed,
    },
  ];

  const categories = [
    { id: "work", label: "Work", icon: Briefcase, count: taskCounts.work },
    {
      id: "personal",
      label: "Personal",
      icon: User,
      count: taskCounts.personal,
    },
    {
      id: "shopping",
      label: "Shopping",
      icon: ShoppingCart,
      count: taskCounts.shopping,
    },
    { id: "health", label: "Health", icon: Heart, count: taskCounts.health },
  ];

  return (
    <div className="w-64 bg-gray-50 border-r p-4 space-y-6">
      <div>
        <h2 className="font-semibold text-lg mb-4">Task Manager</h2>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Filter className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Filters</span>
        </div>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
                activeFilter === item.id
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <Plus className="w-4 h-4 mr-2" />
          <span className="font-medium text-sm">Categories</span>
        </div>
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onFilterChange(category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-md transition-colors ${
                activeFilter === category.id
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center">
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

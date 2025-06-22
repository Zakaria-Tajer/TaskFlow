import { Outlet } from "react-router";
import { Sidebar } from "../components/Sidebar";
import { useMemo, useState } from "react";

const initialTasks = [
  {
    id: "1",
    title: "Design new landing page",
    description:
      "Create wireframes and mockups for the new product landing page",
    priority: "high" as const,
    status: "in-progress" as const,
    dueDate: "2024-01-15",
    assignee: "Sarah Wilson",
    category: "Work",
  },
  {
    id: "2",
    title: "Review quarterly reports",
    description: "Analyze Q4 performance metrics and prepare presentation",
    priority: "medium" as const,
    status: "todo" as const,
    dueDate: "2024-01-20",
    assignee: "Mike Johnson",
    category: "Work",
  },
  {
    id: "3",
    title: "Buy groceries",
    description: "Milk, bread, eggs, and vegetables for the week",
    priority: "low" as const,
    status: "todo" as const,
    dueDate: "2024-01-12",
    assignee: "",
    category: "Shopping",
  },
  {
    id: "4",
    title: "Schedule dentist appointment",
    description: "Annual checkup and cleaning",
    priority: "medium" as const,
    status: "completed" as const,
    dueDate: "2024-01-10",
    assignee: "",
    category: "Health",
  },
  {
    id: "5",
    title: "Plan weekend trip",
    description: "Research destinations and book accommodations",
    priority: "low" as const,
    status: "todo" as const,
    dueDate: "2024-01-25",
    assignee: "",
    category: "Personal",
  },
];
function TaskLayout() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [tasks, setTasks] = useState(initialTasks);

  const taskCounts = useMemo(() => {
    return {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === "todo").length,
      inProgress: tasks.filter((t) => t.status === "in-progress").length,
      completed: tasks.filter((t) => t.status === "completed").length,
      work: tasks.filter((t) => t.category.toLowerCase() === "work").length,
      personal: tasks.filter((t) => t.category.toLowerCase() === "personal")
        .length,
      shopping: tasks.filter((t) => t.category.toLowerCase() === "shopping")
        .length,
      health: tasks.filter((t) => t.category.toLowerCase() === "health").length,
    };
  }, [tasks]);

  return (
    <div className="flex h-screen">
      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        taskCounts={taskCounts}
      />

      <main className="flex-1 flex flex-col bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default TaskLayout;

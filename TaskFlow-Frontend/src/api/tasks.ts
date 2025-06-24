import { getCookie } from "../utils/CookieUtil";

export type Task = {
  id?: number;
  userId?: number;
  status: "pending" | "ongoing" | "done" | string;
  description: string;
  title: string;
  priority: "low" | "medium" | "high" | string;
  dueDate: Date | string;
};

const token = () => {
  return getCookie();
};
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createTask = async (task: Task) => {
  console.log("Token being sent:", token());

  if (!token()) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${baseURL}/tasks/create`, {
    method: "POST",
    headers: {
      Authorization: token(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("API Error:", error);
    throw new Error(error.message || "Failed to create task");
  }

  return res.json();
};

export const getAllTasks = async () => {
  const res = await fetch(`${baseURL}/tasks/all`, {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: token(),
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);

    throw new Error(error.message || "Failed to Authenticate");
  }
  return res.json();
};

export const updateTask = async (tasks: Task) => {
  const res = await fetch(`${baseURL}/tasks/update/${tasks.id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token(),
    },

    body: JSON.stringify(tasks),
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);

    throw new Error(error.message || "Failed to Update Task");
  }
  return res.json();
};

export const deleteTask = async (tasksId: number) => {
  const res = await fetch(`${baseURL}/tasks/delete/${tasksId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token(),
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);

    throw new Error(error.message || "Failed to Delete Task");
  }
  return res.json();
};

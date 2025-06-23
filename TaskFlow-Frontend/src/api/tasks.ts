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
const baseURL = "http://localhost:8080/api/v1";

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

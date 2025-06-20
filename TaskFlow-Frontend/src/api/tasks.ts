
type Status = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: Status;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createTask = async (task: Task, token: string) => {
  const res = await fetch(`${baseURL}tasks/create`, {
    body: JSON.stringify(task),
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Failed to create task');
  }
  return res.json();

};
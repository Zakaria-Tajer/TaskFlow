import * as yup from "yup";
import type { Task } from "../../api/tasks";


const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description at most be 1000 characters"),
  priority: yup.string().required("Priority is required"),
  status: yup.string().required("Status is required"),
  dueDate: yup.string().required("Due date is required"),
});

export async function validateTask(form: Task) {
  try {
    const validData = await taskSchema.validate(form, { abortEarly: false });
    console.log("Valid task data:", validData);
    return null; 
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const fieldErrors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) fieldErrors[err.path] = err.message;
      });
      return fieldErrors;
    }
    return null;
  }
}

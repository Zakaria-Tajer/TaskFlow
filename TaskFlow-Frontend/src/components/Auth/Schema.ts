import * as yup from "yup";
import type { UserSignUp } from "../../api/user";

const userSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("FirstName is required")
    .min(3, "FirstName must be at least 3 characters"),
  lastName: yup
    .string()
    .required("LastName is required")
    .min(3, "LastName must be at least 3 characters"),
  email: yup.string().required("Email is required").email(),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export async function validateUser(form: UserSignUp) {
  try {
    const validData = await userSchema.validate(form, { abortEarly: false });
    console.log("Valid user data:", validData);
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

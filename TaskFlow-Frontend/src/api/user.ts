export type UserSignIn = {
  id?: number;
  email: string;
  password: string;
};

type Roles = "User";

export type UserSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  roles: Roles;
};

export type AuthResponse = {
  timestamp: string;
  statusCode: string;
  message: string;
  token: string;
};

const baseURL = "http://localhost:8080/api/v1";

export const userSignIn = async (user: UserSignIn) => {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to Sign Up");
  }
  return res.json();
};

export const userSignUp = async (user: UserSignUp) => {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to Sign Up");
  }
  return res.json();
};

// export const geAllUsers = async () => {
//   const res = await fetch(`${baseURL}/tasks/all`);

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Failed to Sign Up");
//   }
//   return res.json();
// };

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

export const isAuthenticated = async () => {
  const res = await fetch(`${baseURL}/auth/authenticate`, {
    headers: {
      Authorization: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6YXR0LnRhamVyQGdtYWlsLmNvbSIsInJvbGVzIjpbIlVzZXIiXSwiaWF0IjoxNzUwMzY1ODUxLCJleHAiOjE3NTA1NDU4NTF9.CoRfBB69S0wu8SPtE9u-KE_m2Kqhprhy5SeJyLh6Kjo`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    console.log(error);

    throw new Error(error.message || "Failed to Authenticate");
  }
  return res.ok;
};

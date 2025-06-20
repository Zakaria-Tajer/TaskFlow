import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { userSignIn, type AuthResponse, type UserSignIn } from "../api/user";
import { Link, useNavigate } from "react-router";
import { setCookie } from "../utils/CookieUtil";

function Login() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: userSignIn,
    onSuccess: (data: AuthResponse) => {
      console.log("✅ Signup success:", data.message);
      setCookie(data.token);

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (data: AuthResponse) => {
      console.log("Failed:", data.message);
    },
  });

  const [loginData, setLoginData] = useState<UserSignIn>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({ email: loginData.email, password: loginData.password });

    navigate("/home");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://img.freepik.com/premium-vector/planning-man-marks-completed-tasks-list_491047-705.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error != null ? (
          <div className="w-full p-2 bg-red-400 my-3 rounded-md text-center">
            <p className="text-sm text-white">{error.message}</p>
          </div>
        ) : (
          ""
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

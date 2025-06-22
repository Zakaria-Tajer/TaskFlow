import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { setCookie } from "../../utils/CookieUtil";
import { userSignUp, type UserSignUp } from "../../api/user";

type AuthResponse = {
  timestamp: string;
  statusCode: string;
  message: string;
  token: string;
};

function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: userSignUp,

    onSuccess: (data: AuthResponse) => {
      console.log("✅ Signup success:", data.message);
      setCookie(data.token);

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (data: AuthResponse) => {
      console.log("Failed:", data.message);
    },
  });

  const [registerData, setRegisterData] = useState<UserSignUp>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: "User",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutate({
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
      roles: registerData.roles,
      image: "",
    });

    navigate("/home");
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full md:max-w-md sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://img.freepik.com/premium-vector/planning-man-marks-completed-tasks-list_491047-705.jpg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up to create your own account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-fit">
        {error != null ? (
          <div className="w-full p-2 bg-red-400 my-3 rounded-md text-center">
            <p className="text-sm text-white">{error.message}</p>
          </div>
        ) : (
          ""
        )}

        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4 justify-around">
            {/* firstname */}
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                  type="text"
                  name="firstname"
                  id="firstname"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            {/*lastname*/}
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                  type="text"
                  name="lastname"
                  id="lastname"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                type="email"
                name="email"
                id="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          {/*password*/}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRegisterData({ ...registerData, password: e.target.value })
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
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <Link
            to="/"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

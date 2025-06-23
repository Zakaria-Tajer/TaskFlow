import { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useAuth } from "./AuthContext";
import { getCookie, removeCookie } from "../../utils/CookieUtil";
import { useNavigate } from "react-router";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const { authData } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    if (getCookie() !== "") {
      removeCookie();

      navigate("/");
    }
  };

  return (
    <header className="border-b bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {`${authData?.firstName?.charAt(0).toUpperCase() || ""}${
                  authData?.lastName?.charAt(0).toUpperCase() || ""
                }`}
              </div>
              <BiChevronDown className="w-4 h-4" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg border z-50">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">
                    {" "}
                    {`${authData?.firstName || ""}  ${
                      authData?.lastName || ""
                    }`}
                  </p>
                  <p className="text-xs text-gray-500">{authData?.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={logout}
                    className="flex cursor-pointer items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

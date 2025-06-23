import { Navigate, Route, Routes } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/user";
import Loading from "../components/Loading";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import HomeTasks from "../pages/HomeTasks";
import { AuthProvider } from "../components/Tasks/AuthContext";

function AppRoutes() {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: isAuthenticated,
    retry: false,
  });

  if (isLoading) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          data ? (
            <AuthProvider authData={data}>
              <HomeTasks />
            </AuthProvider>
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;

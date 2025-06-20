import { Navigate, Route, Routes } from "react-router";
import HomeTasks from "../pages/HomeTasks";
import Login from "../components/Login";
import Register from "../components/Register";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/user";
import Loading from "../components/Loading";

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
        element={data ? <HomeTasks /> : <Navigate to="/" />}
      />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;

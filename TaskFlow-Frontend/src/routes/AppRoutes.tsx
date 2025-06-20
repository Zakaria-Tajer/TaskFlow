import { Navigate, Route, Routes } from "react-router";
import HomeTasks from "../pages/HomeTasks";
import Login from "../components/Login";
import Register from "../components/Register";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/user";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";

function AppRoutes() {
  const [loading, setLoading] = useState(true);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: isAuthenticated,
    retry: false,
  });

  if (isLoading) return <Loading />;
  const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds

  clearTimeout(timer);
  // return () => clearTimeout(timer);
  // if (isError) return <Navigate to="/" />;

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

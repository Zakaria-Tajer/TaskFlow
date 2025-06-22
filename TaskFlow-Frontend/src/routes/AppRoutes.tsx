import { Navigate, Route, Routes } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "../api/user";
import Loading from "../components/Loading";
import Calendar from "../pages/Calendar";
import TaskLayout from "../layout/TaskLayout";
import Tasks from "../components/Tasks/Tasks";
import Trash from "../pages/Trash";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

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
      <Route path="/home" element={data ? <TaskLayout /> : <Navigate to="/" />}>
        <Route index element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="trash" element={<Trash />} />
      </Route>

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;

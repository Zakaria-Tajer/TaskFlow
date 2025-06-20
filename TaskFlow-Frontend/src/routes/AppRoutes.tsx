import React from "react";
import { Route, Routes } from "react-router";
import HomeTasks from "../pages/HomeTasks";
import Login from "../components/Login";
import Register from "../components/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<HomeTasks />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AppRoutes;

import { Outlet } from "react-router";

function TaskLayout() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default TaskLayout;

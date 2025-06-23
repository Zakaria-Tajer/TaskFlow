import Tasks from "../components/Tasks/Tasks";

export type AuthProps = {
  AuthData: {
    firstname: string;
    lastname: string;
    email: string;
  };
};
function HomeTasks() {
  return (
    <div className="flex h-screen">
      <main className="flex-1 flex flex-col bg-gray-100">
        <Tasks />
      </main>
    </div>
  );
}

export default HomeTasks;

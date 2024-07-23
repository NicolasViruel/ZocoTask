import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import { useNavigate } from "react-router-dom";

function TasksPage() {
  const { getTasks, tasks, filteredTasks } = useTasks();
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  const handleRefresh = () => {
    navigate("/add-task");
  };

  if (tasks.length === 0 && filteredTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">No Tasks</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleRefresh}
        >
          Add Tasks
        </button>
      </div>
    );
  }
  if (filteredTasks.length === 0) {
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className=" text-3xl font-bold mb-4">No Tasks</h1>
      <TaskFilter />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleRefresh}
      >
        Refresh Tasks
      </button>
    </div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>
      <TaskFilter />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
        {filteredTasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}

export default TasksPage;

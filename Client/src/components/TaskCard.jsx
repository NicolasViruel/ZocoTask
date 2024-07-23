import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useAuth } from "../context/AuthContext";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();
  const { isAdmin } = useAuth();

  return (
    <div className="bg-zinc-800 max-w-full w-full p-5 md:p-10 rounded-md">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h1 className="text-xl md:text-2xl font-bold overflow-hidden text-ellipsis">
          {task.title}
        </h1>
        {isAdmin ? (
          <>
            <div className="flex gap-x-2 items-center mt-2 md:mt-0">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => {
                  deleteTask(task._id);
                }}
              >
                Delete
              </button>
              <Link
                to={`/tasks/${task._id}`}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </Link>
            </div>
          </>
        ) : (
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </Link>
        )}
      </header>
      <p className="text-slate-300 mt-2 md:mt-4 break-words">
        {task.description}
      </p>
      <p className="text-slate-400 mt-1 md:mt-2">
        {dayjs(task.date).utc().format("DD/MM/YYYY")}
      </p>
    </div>
  );
}

export default TaskCard;

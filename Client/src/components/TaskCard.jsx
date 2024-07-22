import { useTasks } from "../context/TasksContext";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function TaskCard( { task }) {

    const { deleteTask } =useTasks()

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
    <header className="flex justify-between items-start">
      <h1 className="text-2xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {task.title}
      </h1>
      <div className="flex gap-x-2 items-center">
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
    </header>
    <p className="text-slate-300">{task.description}</p>
    <p>{dayjs(task.date).utc().format('DD/MM/YYYY')} </p>
  </div>
  );
}

export default TaskCard;

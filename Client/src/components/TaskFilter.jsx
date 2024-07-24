import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";

function TaskFilter() {
  const { filterTasks } = useTasks();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    filterTasks(title, date);
  }, [title, date]);

  return (
    <form className="flex space-x-4 mb-4">
      <input
        type="text"
        placeholder="Filter by title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 rounded-md bg-zinc-700 text-white"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-2 rounded-md bg-zinc-700 text-white hidden"
      />

      <button
        type="button"
        onClick={() => filterTasks(title, date)}
        className="px-4 py-2 rounded-md bg-sky-500 text-white hidden"
      >
        Filter
      </button>
    </form>
  );
}

export default TaskFilter;

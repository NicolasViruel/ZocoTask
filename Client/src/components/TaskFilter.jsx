// import { useEffect, useState } from "react";
// import { useTasks } from "../context/TasksContext";

// function TaskFilter() {
//   //traigo el contexto de filter
//   const { filterTasks } = useTasks();

//   const [title, setTitle] = useState("");
//   const [date, setDate] = useState("");

//   const handleFilter = (e) => {
//     e.preventDefault();
//     filterTasks(title, date);
//   };

//   useEffect(() => {
//     filterTasks(title, date);
//   }, [title, date]);

//   return (
//     <form onSubmit={handleFilter} className="flex space-x-4 mb-4">
//       <input
//         type="text"
//         placeholder="Filter by title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="px-4 py-2 rounded-md bg-zinc-700 text-white"
//       />

//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value) }
//         className="px-4 py-2 rounded-md bg-zinc-700 text-white"
//         />


//       <button
//         type="submit"
//         className="px-4 py-2 rounded-md bg-sky-500 text-white"
//       >
//         Filter
//       </button>
      
//     </form>
//   );
// }

// export default TaskFilter;


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
        className="px-4 py-2 rounded-md bg-zinc-700 text-white"
      />

      <button
        type="button" // Cambiado a tipo "button" porque el submit ya no es necesario
        onClick={() => filterTasks(title, date)}
        className="px-4 py-2 rounded-md bg-sky-500 text-white"
      >
        Filter
      </button>
    </form>
  );
}

export default TaskFilter;

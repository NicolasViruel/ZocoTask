import { createContext, useCallback, useContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  updateTasksRequest,
} from "../api/tasks";
import dayjs from "dayjs";
import Swal from "sweetalert2";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  //estado del filtro
  const [filteredTasks, setFilteredTasks] = useState([]);

  //utilizo el useCallBack para que el componente se vuelva a renderizar y lo guarda en memoria.
  const getTasks = useCallback(async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createTask = async (task) => {
    try {
      const res = await createTasksRequest(task);
      Swal.fire({
        icon: "success",
        title: "Task Created!",
        text: "Your task has been created successfully.",
      });
      //actualizar el estado de las tareas
      // setTasks([...tasks, res.data]);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Task",
        text: error.response?.data?.message || "Please try again later.",
      });
    }
  };

  const deleteTask = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteTasksRequest(id);
          const newTasks = tasks.filter((task) => task._id !== id);
          setTasks(newTasks);
          setFilteredTasks(newTasks);
          Swal.fire({
            icon: "success",
            title: "Task Deleted!",
            text: "The task has been deleted successfully.",
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Failed to Delete Task",
            text: error.response?.data?.message || "Please try again later.",
          });
        }
      }
    });
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Fetch Task",
        text: error.response?.data?.message || "Please try again later.",
      });
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task);
      // actualizar el estado de las tareas
      const updatedTasks = tasks.map((t) => (t._id === id ? res.data : t));
      setTasks(updatedTasks);
      Swal.fire({
        icon: "success",
        title: "Task Updated!",
        text: "The task has been updated successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update Task",
        text: error.response?.data?.message || "Please try again later.",
      });
    }
  };

  const filterTasks = (title, date) => {
    //si los campos estan vacios que devuelva las tareas
    if (!title && !date) {
      setFilteredTasks(tasks);
      return;
    }

    let newFilteredTasks = tasks;
    if (title) {
      newFilteredTasks = newFilteredTasks.filter((task) =>
        task.title.toLowerCase().includes(title.toLowerCase())
      );
    }

    if (date) {
      console.log("Filtrando por date:", date);
      newFilteredTasks = newFilteredTasks.filter((task) => {
        //propiedad StartOf para que compare solo el dia y no agregue la hora.
        const taskDate = dayjs(task.date).startOf("day");
        const inputDate = dayjs(date).startOf("day");
        // console.log(`dato de la tarea: ${taskDate.format('YYYY-MM-DD')}, dato del input: ${inputDate.format('YYYY-MM-DD')}`);
        return taskDate.isSame(inputDate, "day");
      });
    }
    setFilteredTasks(newFilteredTasks);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        filteredTasks,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

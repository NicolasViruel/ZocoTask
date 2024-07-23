import { createContext, useCallback, useContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  updateTasksRequest,
} from "../api/tasks";
import dayjs from "dayjs";

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
    const res = await createTasksRequest(task);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      //creo un arreglo nuevo eliminando la tarea seleccionada
      // if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
      setFilteredTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTasks = (title, date) => {
    // console.log('Date:', date);
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
      console.log('Filtering by date:', date);
      newFilteredTasks = newFilteredTasks.filter((task) => {
        //propiedad StartOf para que compare solo el dia y no agregue la hora.
        const taskDate = dayjs(task.date).startOf('day');
        const inputDate = dayjs(date).startOf('day');
        // console.log(`dato de la tarea: ${taskDate.format('YYYY-MM-DD')}, dato del input: ${inputDate.format('YYYY-MM-DD')}`);
        return taskDate.isSame(inputDate, 'day');
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

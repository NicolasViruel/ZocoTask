const Task = require("../models/task.model");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      //traigo todas las tareas que le pertenecen a ese usuario
      user: req.user.id,
    }).populate("user"); //populamos para ver la info del usuario
    res.json(tasks);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const createTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.sendStatus(204); //para no mostrar nada directamente
  } catch (error) {
    return res.status(404).json({ message: "Task not found " });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

module.exports = {
  getTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask,
};

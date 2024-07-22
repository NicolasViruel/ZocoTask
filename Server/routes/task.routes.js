const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const authRequired = require("../middlewares/validateToken");
const validateSchema = require("../middlewares/validatorMiddleware");
const createTaskSchema = require("../schemas/task.schema");

router.get("/", authRequired, taskController.getTasks);

router.get("/:id", authRequired, taskController.getTask);

router.post("/", authRequired, validateSchema(createTaskSchema), taskController.createTasks);

router.delete("/:id", authRequired, taskController.deleteTask);

router.put("/:id", authRequired, taskController.updateTask);



module.exports = router;
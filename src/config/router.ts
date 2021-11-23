import express from "express";
import TaskController from "../api/controller/taskController";

const tasks = new TaskController
const router = express.Router()

router.get('/tasks', tasks.GetTasks)
router.get('/tasks/all', tasks.GetAllTasks)
router.get('/tasks/:id', tasks.GetTasks)

router.post('/tasks', tasks.AddTask)
router.post('/tasks/update/:id', tasks.UpdateTask)
router.post('/tasks/disable/:id', tasks.DeactiveTask)

export default router
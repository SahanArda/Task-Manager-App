import express from "express";
import {
  createTask,
  getTasks,
  getCompletedTasks,
  getPendingTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { body } from "express-validator";

const router = express.Router();

export const validateTask = [
  body("title").notEmpty().withMessage("Please enter a title"),
  body("description").notEmpty().withMessage("Please enter a description"),
  body("status")
    .notEmpty()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either 'pending' or 'completed'"),
];

export const validateUpdateTask = [
  body("title").optional().notEmpty().withMessage("Please enter a title"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Please enter a description"),
  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be either 'pending' or 'completed'"),
];

router.post("/", validateTask, createTask);
router.get("/", getTasks);
router.get("/pending", getPendingTasks);
router.get("/completed", getCompletedTasks);
router.put("/:id", validateUpdateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;

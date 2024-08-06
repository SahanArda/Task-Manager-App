import { validationResult } from "express-validator";
import db from "../models/index.js";

const Task = db.Task;

export const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { title, description, status } = req.body;
    const userId = req.userId;

    const newTask = await Task.create({ title, description, status, userId });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const tasks = await Task.findAll({ where: { userId, status: "completed" } });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ where: { id, userId } });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: error.message });
  }
};

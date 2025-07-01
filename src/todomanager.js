"use strict";
// This module defines a TodoManager class that manages tasks, allowing adding, removing, marking as completed, and listing tasks.
const fs = require("fs");
const Task = require("./task");

class TodoManager {
  constructor(filename = "tasks.json") {
    this.filename = filename;
    this.tasks = [];
    this.loadTasks();
  }

  loadTasks() {
    if (fs.existsSync(this.filename)) {
      try {
        const data = fs.readFileSync(this.filename, "utf8");
        if (data.trim().length === 0) {
          this.tasks = [];
        } else {
          const tasksArray = JSON.parse(data);
          this.tasks = tasksArray.map(
            (t) => new Task(t.id, t.description, t.dueDate, t.completed)
          );
        }
      } catch (err) {
        console.error("Error loading tasks:", err.message);
        this.tasks = [];
      }
    }
  }

  saveTasks() {
    try {
      fs.writeFileSync(this.filename, JSON.stringify(this.tasks, null, 2));
      return true;
    } catch (err) {
      console.error("Error saving tasks:", err.message);
      return false;
    }
  }

  addTask(description, dueDate) {
    const id = Date.now(); // simple unique ID
    const task = new Task(id, description, dueDate);
    this.tasks.push(task);
    const saved = this.saveTasks();
    this.saveTasks();
    if (!saved) {
      // Remove the task if save failed
      this.tasks.pop();
      throw new Error("Failed to save task to file");
    }
    return task;
  }

  removeTask(id) {
    const originalLength = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== id);

    if (this.tasks.length === originalLength) {
      return false; // Task not found
    }
    const saved = this.saveTasks();
    if (!saved) {
      throw new Error("Failed to save changes to file");
    }
    return true;
  }

  markCompleted(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      return false; // Task not found
    }

    if (task.completed) {
      return false; // Already completed
    }

    task.completed = true;
    const saved = this.saveTasks();
    if (!saved) {
      task.completed = false; // Revert on save failure
      throw new Error("Failed to save changes to file");
    }
    return true;
  }

  listTasks() {
    const pending = this.tasks.filter((t) => !t.completed);
    const completed = this.tasks.filter((t) => t.completed);
    return { pending, completed };
  }
}

module.exports = TodoManager;

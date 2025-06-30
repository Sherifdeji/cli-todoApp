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
        this.tasks = [];
      }
    }
  }

  saveTasks() {
    fs.writeFileSync(this.filename, JSON.stringify(this.tasks, null, 2));
  }

  addTask(description, dueDate) {
    const id = Date.now(); // simple unique ID
    const task = new Task(id, description, dueDate);
    this.tasks.push(task);
    this.saveTasks();
    return task;
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  markCompleted(id) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.completed = true;
      this.saveTasks();
    }
  }

  listTasks() {
    const pending = this.tasks.filter((t) => !t.completed);
    const completed = this.tasks.filter((t) => t.completed);
    return { pending, completed };
  }
}

module.exports = TodoManager;

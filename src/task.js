"use strict";
// This module defines a Task class that represents a task with an ID, description, due date, and completion status.
class Task {
  constructor(id, description, dueDate, completed = false) {
    this.id = id; // unique identifier
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}

module.exports = Task;

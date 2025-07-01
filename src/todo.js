"use strict";
const readline = require("readline");
const TodoManager = require("./todomanager");
const {
  isValidDate,
  isValidTaskId,
  validateDescription,
  confirmAction,
  formatDate,
  showError,
  showSuccess,
} = require("../utils/validation");

const manager = new TodoManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  setTimeout(() => {
    console.log(`
    What would you like to do?
    1. Add a new task
    2. Mark a task as Completed
    3. Remove a task
    4. View all tasks
    5. Exit Application
    ---------------
    `);

    rl.question("Choose an option: ", handleMenu);
  }, 2000);
}

function handleMenu(option) {
  switch (option.trim()) {
    case "1":
      addTaskWithValidation();
      break;
    case "2":
      markTaskCompletedWithValidation();
      break;
    case "3":
      removeTaskWithValidation();
      break;
    case "4":
      displayAllTasks();
      break;
    case "5":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      showError("Invalid option. Please choose a number between 1-5.");
      showMenu();
  }
}

function addTaskWithValidation() {
  rl.question("Task description: ", (desc) => {
    const descValidation = validateDescription(desc);

    if (!descValidation.valid) {
      showError(descValidation.message);
      addTaskWithValidation();
      return;
    }

    askForDueDateWithValidation(desc.trim());
  });
}

function askForDueDateWithValidation(description) {
  rl.question("Due date (YYYY-MM-DD): ", (due) => {
    if (!isValidDate(due)) {
      showError(
        "Invalid date format or date is in the past. Please use YYYY-MM-DD format and ensure the date is today or in the future."
      );
      askForDueDateWithValidation(description);
      return;
    }

    try {
      const task = manager.addTask(description, due);
      showSuccess(`Task added successfully! ID: ${task.id}`);
      showMenu();
    } catch (error) {
      showError(`Error adding task: ${error.message}`);
      showMenu();
    }
  });
}

function markTaskCompletedWithValidation() {
  const allTasks = [
    ...manager.listTasks().pending,
    ...manager.listTasks().completed,
  ];

  if (allTasks.length === 0) {
    showError("No tasks available. Add some tasks first!");
    showMenu();
    return;
  }

  // Show available pending tasks
  const pendingTasks = manager.listTasks().pending;
  if (pendingTasks.length === 0) {
    showError("No pending tasks to mark as completed!");
    showMenu();
    return;
  }

  console.log("\n--- Available Pending Tasks ---");
  pendingTasks.forEach((t) => {
    console.log(`[${t.id}] ${t.description} (Due: ${formatDate(t.dueDate)})`);
  });

  rl.question("Enter task ID to mark as completed: ", (id) => {
    if (!isValidTaskId(id, pendingTasks)) {
      showError(
        "Invalid task ID. Please enter a valid ID from the pending tasks list."
      );
      markTaskCompletedWithValidation();
      return;
    }

    try {
      const success = manager.markCompleted(Number(id));
      if (success) {
        showSuccess("Task marked as completed!");
      } else {
        showError("Task not found or already completed.");
      }
      showMenu();
    } catch (error) {
      showError(`Error marking task as completed: ${error.message}`);
      showMenu();
    }
  });
}

function removeTaskWithValidation() {
  const allTasks = [
    ...manager.listTasks().pending,
    ...manager.listTasks().completed,
  ];

  if (allTasks.length === 0) {
    showError("No tasks available to remove!");
    showMenu();
    return;
  }

  // Show all available tasks
  console.log("\n--- All Tasks ---");
  allTasks.forEach((t) => {
    const status = t.completed ? "✅" : "⏳";
    console.log(
      `[${t.id}] ${status} ${t.description} (Due: ${formatDate(t.dueDate)})`
    );
  });

  rl.question("Enter task ID to remove: ", (id) => {
    if (!isValidTaskId(id, allTasks)) {
      showError(
        "Invalid task ID. Please enter a valid ID from the tasks list."
      );
      removeTaskWithValidation();
      return;
    }

    const taskToRemove = allTasks.find((t) => t.id === Number(id));
    confirmAction(
      rl,
      `Are you sure you want to delete "${taskToRemove.description}"?`,
      (confirmed) => {
        if (confirmed) {
          try {
            const success = manager.removeTask(Number(id));
            if (success) {
              showSuccess("Task removed successfully!");
            } else {
              showError("Task not found.");
            }
          } catch (error) {
            showError(`Error removing task: ${error.message}`);
          }
        }
        showMenu();
      }
    );
  });
}

function displayAllTasks() {
  const { pending, completed } = manager.listTasks();

  console.log("\n--- Pending Tasks ---");
  if (pending.length === 0) {
    console.log("No pending tasks.");
  } else {
    pending.forEach((t) => {
      console.log(`[${t.id}] ${t.description} (Due: ${formatDate(t.dueDate)})`);
    });
  }

  console.log("\n--- Completed Tasks ---");
  if (completed.length === 0) {
    console.log("No completed tasks yet.");
  } else {
    completed.forEach((t) => {
      console.log(
        `[${t.id}] ✅ ${t.description} (Due: ${formatDate(t.dueDate)})`
      );
    });
  }

  rl.question("\nPress Enter to return to the menu...", () => {
    showMenu();
  });
}

// Main application loop
function startApp() {
  // Welcome user
  console.log(`
    Welcome to my To-Do App!🤗
    Conquer your tasks🏁, stay productive⏳, and make every day count! 🚀😎✅
    `);

  // Call mainMenu()
  showMenu();
}

startApp();

"use strict";
const readline = require("readline");
const TodoManager = require("./todomanager");

const manager = new TodoManager();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  setTimeout(() => {
    // Display menu options
    // console.clear(); // Clear the console for better UX
    console.log(`
    What would you like to do?
    1. Add a new task
    2. Mark a task as Completed
    3. Remove a task
    4. View all tasks
    5. Exit
    `);

    rl.question("Choose an option: ", handleMenu);
  }, 2000);
}

function handleMenu(option) {
  switch (option.trim()) {
    case "1":
      rl.question("Task description: ", (desc) => {
        rl.question("Due date (YYYY-MM-DD): ", (due) => {
          manager.addTask(desc, due);
          console.log("Task added!");
          showMenu(); // Show menu again
        });
      });
      break;
    case "2":
      rl.question("Enter task ID to mark as completed: ", (id) => {
        manager.markCompleted(Number(id));
        console.log("Task marked as completed!");
        showMenu();
      });
      break;
    case "3":
      rl.question("Enter task ID to remove: ", (id) => {
        manager.removeTask(Number(id));
        console.log("Task removed!");
        showMenu();
      });
      break;
    case "4":
      const { pending, completed } = manager.listTasks();
      console.log("\n--- Pending Tasks ---");
      if (pending.length === 0) {
        console.log("No pending tasks.");
      } else {
        pending.forEach((t) => {
          console.log(`[${t.id}] ${t.description} (Due: ${t.dueDate})`);
        });
      }

      console.log("\n--- Completed Tasks ---");
      if (completed.length === 0) {
        console.log("No completed tasks yet.");
      } else {
        completed.forEach((t) => {
          console.log(`[${t.id}] ${t.description}`);
        });
      }

      // Wait for user to press Enter before showing the menu again
      rl.question("\nPress Enter to return to the menu...", () => {
        showMenu();
      });
      break;
    case "5":
      console.log("Goodbye!");
      rl.close();
      break;
    default:
      console.log("Invalid option. Please try again.");
      showMenu();
  }
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

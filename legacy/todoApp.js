"use strict";
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Accessing arguments
const args = process.argv;

// Getting the cwd
// The "todoApp.js" is 10 characters long so -10 removes last 10 characters
const currentWorkingDirectory = args[1].slice(0, -10);

// Checking if todo.json and done.json already exist in cwd, if not we will create them
if (fs.existsSync(currentWorkingDirectory + "todos.json") === false) {
  fs.writeFileSync("todos.json", JSON.stringify([]));
}
if (fs.existsSync(currentWorkingDirectory + "done.json") === false) {
  fs.writeFileSync("done.json", JSON.stringify([]));
}

// Reading the json files
const todos = JSON.parse(fs.readFileSync("todos.json"));
const completed = JSON.parse(fs.readFileSync("done.json"));

// Saving todos back to json
function saveTodos() {
  fs.writeFileSync("todos.json", JSON.stringify(todos));
}
function saveCompleted() {
  fs.writeFileSync("done.json", JSON.stringify(completed));
}

const questions = ["Task : ", "Due date(DD-MM-YY): "];

// Function for getting id number
function getId() {
  if (todos.length === 0) {
    return 1;
  } else {
    return todos[todos.length - 1].id + 1;
  }
}

// Adding a task
function addTodo() {
  const userData = { id: getId() };
  let index = 0;

  const askQuestion = function () {
    if (index < questions.length) {
      rl.question(questions[index], (answer) => {
        if (index === 0) userData.title = answer;
        else if (index === 1) userData.dueDate = answer;

        index++;
        askQuestion();
      });
    } else {
      todos.push(userData);
      saveTodos();
      console.log(`Task "${userData.title}" sucessfully added.`);

      mainMenu();
    }
  };

  return askQuestion();
}

// Displaying Todos
function displayTodos() {
  console.log("\nTo-Do List:");
  if (todos.length === 0) {
    console.log("No task found.");
  } else {
    for (let todo of todos) {
      console.table(todo);
    }
  }
  console.log("\nCompleted task(s):");
  if (completed.length === 0) {
    console.log("No completed task found.");
  } else {
    for (let todo of completed) {
      console.table(todo);
    }
  }
  mainMenu();
}

// Removing a task
function removeTodo(taskId) {
  if (taskId >= 0) {
    const index = todos.findIndex((todo) => todo.id === parseInt(taskId));

    if (index !== -1) {
      const removedTask = todos.splice(index, 1);
      console.log(`Task "${removedTask[0].title}" removed.`);
      saveTodos();
      mainMenu();
    }
  } else {
    console.log("Invalid task number.");
  }
}

// Mark a task as complete
function markComplete(taskId) {
  if (taskId > 0 && todos.length !== 0) {
    const index = todos.findIndex((todo) => todo.id === parseInt(taskId));

    if (index !== -1) {
      const completedTask = todos.splice(index, 1)[0];
      saveTodos();
      console.log(completedTask);
      completed.push(completedTask);
      saveCompleted();

      console.log(`Task "${completedTask.title}" successfully completed🚀💯.`);
      mainMenu();
    }
  } else {
    console.log("Invalid task number.");
  }
}

function mainMenu() {
  setTimeout(() => {
    // Display menu options and handle user input
    console.log(`
    What would you like to do?
    1. Add a new task
    2. View all tasks
    3. Remove a task
    4. Complete a task
    5. Exit
    `);
    rl.question("Choose an option: ", handleMenu);
  }, 1000);
}

// Menu handler
function handleMenu(option) {
  switch (option) {
    case "1":
      addTodo();
      break;

    case "2":
      displayTodos();
      break;

    case "3":
      if (todos.length === 0) {
        console.log("No tasks to be removed!");
        mainMenu();
      } else {
        rl.question("Enter the task number to remove: ", removeTodo);
      }
      break;

    case "4":
      if (todos.length === 0) {
        console.log("No tasks to be completed!");
        mainMenu();
      } else {
        rl.question("Enter the task number to complete: ", markComplete);
      }
      break;

    case "5":
      console.log("Exiting... Goodbye!!👋🏽");
      rl.close();
      break;

    default:
      console.log("Invalid option! Please choose again.");
      mainMenu();
  }
}

// Main application loop
function startApp() {
  // Welcome user
  console.log(`
    Welcome to my To-Do App!📝🤗
    Conquer your tasks🏁, stay productive⏳, and make every day count! 🚀😎✅
    `);

  // Call mainMenu()
  mainMenu();
}

startApp();

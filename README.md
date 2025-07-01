# 📋 Todo CLI Application

A beautiful command-line task management application built with Node.js, with file-based storage (JSON) and stunning visual interface that helps users organize and track their tasks efficiently.

![Todo App Demo](https://img.shields.io/badge/CLI-Beautiful-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![License](https://img.shields.io/badge/License-ISC-blue)

## ✨ Features

- 🎨 **Beautiful CLI Interface** - Colorful, boxed menus and messages using chalk and boxen
- ✅ **Complete Task Management** - Add, complete, remove, and view tasks
- 📅 **Smart Date Handling** - Displays "Today", "Tomorrow", "Overdue" with color coding
- 🛡️ **Comprehensive Validation** - Input validation with user-friendly error messages
- 💾 **File-Based Storage** - Persistent JSON storage with error recovery
- 🔄 **Confirmation Dialogs** - Prevents accidental deletions
- 🏗️ **Modular Architecture** - Clean, object-oriented design
- 🎯 **User-Friendly** - Intuitive interface with clear feedback

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Sherifdeji/cli-todoApp.git
   cd todo-cli-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

## 🚀 Usage

### Main Menu

```
📋 TODO APP MENU

1. Add a new task
2. Mark a task as Completed
3. Remove a task
4. View all tasks
5. Exit Application
```

### Adding Tasks

- Enter a descriptive task name
- Provide due date in YYYY-MM-DD format
- Past dates are automatically rejected

### Managing Tasks

- **Complete Tasks**: Choose from pending tasks list
- **Remove Tasks**: Select from all tasks with confirmation
- **View Tasks**: See pending and completed tasks separately

## 🏗️ Project Structure

```
📁 cli-todoApp/
├── 📁 legacy/
│   └── 📄 todoApp.js     # Original monolithic implementation
├── 📁src/
│   ├── 📄task.js         # Task model definition
│   ├── 📄todo.js         # Main application logic(entry point)
│   └── 📄todomanager.js  # Task management operations
├── 📁utils/
│   └── 📄validation.js   # Input validation utilities
├── 📄package.json        # Project configuration
├── 📄 .gitignore
└── 📄README.md          # Project documentation
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Readline** - CLI input handling
- **Chalk** - Terminal colors and styling
- **Boxen** - Terminal boxes and borders
- **File System (fs)** - JSON data persistence

## 🔧 Available Scripts

```bash
npm start        # Run the main application
npm run legacy   # Run the original version
npm test         # Run tests (placeholder)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License. Feel free to use and modify for your own projects.

---

_**Built with ❤️ by Sherif Ibrahim**_

"use strict";

/**
 * Validates if a date string is in YYYY-MM-DD format and not in the past
 * @param {string} dateString - Date string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date instanceof Date && !isNaN(date) && date >= today;
}

/**
 * Validates if a task ID exists in the given tasks array
 * @param {string|number} id - Task ID to validate
 * @param {Array} tasks - Array of tasks to search in
 * @returns {boolean} - True if valid, false otherwise
 */
function isValidTaskId(id, tasks) {
  const numId = Number(id);
  return !isNaN(numId) && numId > 0 && tasks.some((task) => task.id === numId);
}

/**
 * Validates task description for length and content
 * @param {string} description - Task description to validate
 * @returns {Object} - Object with valid boolean and optional message
 */
function validateDescription(description) {
  if (!description || description.trim().length === 0) {
    return { valid: false, message: "Task description cannot be empty." };
  }
  if (description.trim().length < 3) {
    return {
      valid: false,
      message: "Task description must be at least 3 characters long.",
    };
  }
  if (description.trim().length > 100) {
    return {
      valid: false,
      message: "Task description cannot exceed 100 characters.",
    };
  }
  return { valid: true };
}

/**
 * Prompts user for confirmation of an action
 * @param {Object} rl - Readline interface
 * @param {string} message - Confirmation message
 * @param {Function} callback - Callback function with boolean result
 */
function confirmAction(rl, message, callback) {
  rl.question(`${message} (y/N): `, (answer) => {
    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      callback(true);
    } else {
      console.log("Action cancelled.");
      callback(false);
    }
  });
}

/**
 * Formats a date for display
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "Tomorrow";
  } else if (date < today) {
    return `Overdue (${dateString})`;
  } else {
    return dateString;
  }
}

/**
 * Displays error message with consistent formatting
 * @param {string} message - Error message to display
 */
function showError(message) {
  console.log(`❌ ${message}`);
}

/**
 * Displays success message with consistent formatting
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
  console.log(`✅ ${message}`);
}

module.exports = {
  isValidDate,
  isValidTaskId,
  validateDescription,
  confirmAction,
  formatDate,
  showError,
  showSuccess,
};

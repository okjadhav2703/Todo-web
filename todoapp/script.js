const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-options button");

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

function toggleTaskStatus(id) {
  tasks.forEach(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  saveTasksToLocalStorage();
  renderTasks();
}

function showAllTasks() {
  renderTasks();
}

function showActiveTasks() {
  const activeTasks = tasks.filter(task => !task.completed);
  renderTasks(activeTasks);
}

function showCompletedTasks() {
  const completedTasks = tasks.filter(task => task.completed);
  renderTasks(completedTasks);
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  tasks = storedTasks ? JSON.parse(storedTasks) : [];
}

function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = "";
  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="${task.completed ? "completed" : ""}" onclick="toggleTaskStatus(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

getTasksFrom

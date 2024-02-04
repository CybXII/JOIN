let currentDraggedElement;

let tasks = [
  {
    categoryboard: "todo",
    category: "to do Task",
    title: "Contact Form & Imprint",
    description: "Create a contact form and imprint page...",
    dueDate: "2024-02-03",
    prio: "medium",
    subtasks: ["Subtask1", "Subtask2", "Subtask3"],
    assignedTo: ["AB", "CD", "EF"],
  },
  {
    categoryboard: "todo",
    category: "in progress Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
  {
    categoryboard: "todo",
    category: "feedback Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
  {
    categoryboard: "done",
    category: "done Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
];

let tasksTodo;
let tasksDone;
let tasksInProgress;
let tasksAwaitFeedback;
let tasksUrgent;

function moveToLocation(taskId) {
  currentDraggedElement = taskId;
  console.log(taskId);
  console.log('movetolocation');
}

function allowDrop(ev) {
  ev.preventDefault();
}

function removeHighlight() {
  document.getElementById("drag-done").classList.add("d-none");
  document.getElementById("drag-todo").classList.add("d-none");
  document.getElementById("drag-in-progress").classList.add("d-none");
  document.getElementById("drag-await-feedback").classList.add("d-none");
  console.log('removehighlight');
}

function highlight() {
  document.getElementById("drag-done").classList.remove("d-none");
  document.getElementById("drag-todo").classList.remove("d-none");
  document.getElementById("drag-in-progress").classList.remove("d-none");
  document.getElementById("drag-await-feedback").classList.remove("d-none");

  if (tasksTodo == 0)
    document.getElementById("no-task-todo").classList.add("d-none");
  if (tasksInProgress == 0)
    document.getElementById("no-task-in-progress").classList.add("d-none");
  if (tasksAwaitFeedback == 0)
    document.getElementById("no-task-await-feedback").classList.add("d-none");
  if (tasksDone == 0)
    document.getElementById("no-task-done").classList.add("d-none");
  console.log('highlight');
}

function moveTo(category) {
  tasks[currentDraggedElement]["categoryboard"] = category;
  updateHTML();
  console.log(tasks[currentDraggedElement]["categoryboard"]);
  console.log('moveto');
}

function updateHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  tasks.forEach(function (task, i) {
    document.getElementById(
      task.categoryboard
    ).innerHTML += `<div class="card-board" draggable="true" ondragstart="moveToLocation(${i})" id="board-card${i}">
  <div class="frame-119">
    <div class="card-board-user-story">
      <span class="card-board-user-story-text">${task.category}</span>
    </div>
    <div class="frame-114">
      <span class="card-board-title">${task.title}</span>
      <span class="card-board-content">${task.description}</span>
    </div>
    <div class="card-board-progress">
      <div class="card-board-progress-bar">
        <div class="card-board-progress-bar-filler"></div>
      </div>
      <span class="card-board-count-progress">
        1/2 Subtasks
      </span>
    </div>
    <div class="frame-139">
      <div class="frame-217" id="assigned-to${i}">
      </div>
      <div class="card-board-priority">
        <img src="../img/prio-baja-board.svg" class="card-board-priority-img" />
      </div>
    </div>
  </div>
</div>`;
  });

  setAmounts();
}

function openAddTaskContainer() {
  document.getElementById("board-background").classList.remove("d-none");
  document.body.classList.add("background-fixed");
}
function closeAddTaskContainer() {
  document.getElementById("board-background").classList.add("d-none");
  document.body.classList.remove("background-fixed");
}

function dontClose() {
  event.stopPropagation();
  console.log(event);
}

function setAmounts() {
  amountOfTasks = tasks.length;
  tasksTodo = 0;
  tasksDone = 0;
  tasksInProgress = 0;
  tasksAwaitFeedback = 0;
  tasksUrgent = 0;

  for (let i = 0; i < tasks.length; i++) {
    switch (tasks[i].categoryboard) {
      case "todo":
        tasksTodo += 1;
        break;
      case "in-progress":
        tasksInProgress += 1;
        break;
      case "await-feedback":
        tasksAwaitFeedback += 1;
        break;
      case "done":
        tasksDone += 1;
        break;
      default:
        break;
    }
    if (tasks[i].prio == "urgent") tasksUrgent += 1;
  }
  noTasksToDo();
}

function noTasksToDo() {
  if (tasksTodo == 0)
    document.getElementById("todo").innerHTML = noTasksToDoHtml("todo");
  if (tasksInProgress == 0)
    document.getElementById("in-progress").innerHTML =
      noTasksToDoHtml("in-progress");
  if (tasksAwaitFeedback == 0)
    document.getElementById("await-feedback").innerHTML =
      noTasksToDoHtml("await-feedback");
  if (tasksDone == 0)
    document.getElementById("done").innerHTML = noTasksToDoHtml("done");
}

function noTasksToDoHtml(id) {
  return `<div class="card-board-empty" id='no-task-${id}'>No tasks To do</div>`;
}

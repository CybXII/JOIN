let currentDraggedElement;
let currentCardDragged;
let tasksTodo;
let tasksDone;
let tasksInProgress;
let tasksAwaitFeedback;
let tasksUrgent;

let tasks = [
  {
    categoryboard: "todo",
    category: "to do Task",
    title: "Contact Form & Imprint",
    description: "Create a contact form and imprint page...",
    dueDate: "2024-02-15",
    prio: "medium",
    subtasks: ["Subtask1", "Subtask2", "Subtask3"],
    assignedTo: ["AB", "CD", "EF"],
    colors: ["#10C6E8", "#7851CC", "#726129"],
  },
  {
    categoryboard: "in-progress",
    category: "in progress Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "2024-02-23",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
    colors: ["#10C6E8", "#7851CC", "#726129"],
  },
  {
    categoryboard: "await-feedback",
    category: "feedback Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "2024-02-25",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
    colors: ["#10C6E8", "#7851CC", "#726129"],
  },
  {
    categoryboard: "done",
    category: "done Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "2024-01-01",
    prio: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
    colors: ["#10C6E8", "#7851CC", "#726129"],
  },
];

function renderBoardTasks() {
  loadUsersFromLocalStorage();
  loadTasksFromLocalStorage();
  updateHTML();
  classesBoard();
}

function moveToLocation(taskId) {
  currentDraggedElement = taskId;
  console.log(taskId);
  console.log("movetolocation");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function removeHighlight() {
  document.getElementById("drag-done").classList.add("d-none");
  document.getElementById("drag-todo").classList.add("d-none");
  document.getElementById("drag-in-progress").classList.add("d-none");
  document.getElementById("drag-await-feedback").classList.add("d-none");
  console.log("removehighlight");
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
  console.log("highlight");
}

function moveTo(category) {
  tasks[currentDraggedElement]["categoryboard"] = category;
  updateHTML();
  saveTasksToLocalStorage();
  console.log(tasks[currentDraggedElement]["categoryboard"]);
  console.log("moveto");
}

function updateHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";

  tasks.forEach(function (task, i) {
    document.getElementById(
      task.categoryboard
    ).innerHTML += `<div class="card-board" draggable="true" ondragstart="rotateCardStart(${i}),moveToLocation(${i}),highlight()" id="board-card${i}" onclick="openCard(${i})" ondragend="rotateCardEnd()">
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
        <img src="./img/prio-baja-board.svg" id="prio-svg${i}" class="card-board-priority-img" />
      </div>
    </div>
  </div>
</div>`;
    if (task.prio == "urgent") {
      document.getElementById(`prio-svg${i}`).src = "./img/urgent_nofill.svg";
    } else if (task.prio == "medium") {
      document.getElementById(`prio-svg${i}`).src = "./img/medium_nofill.svg";
    } else if (task.prio == "low") {
      document.getElementById(`prio-svg${i}`).src = "./img/low_nofill.svg";
    }



    let assigned = document.getElementById(`assigned-to${i}`);
    for (let j = 0; j < task["assignedTo"].length; j++) {
      const assign = task["assignedTo"][j];
      const colorbg = task["colors"][j];
      assigned.innerHTML += `
<div class="card-board-profile-batch">
  <div class="group-9-board">
    <div class="group-9-text" style="background-color: ${colorbg}">${assign}</div>
  </div>
</div>`;
    }
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
    if (tasks[i].prio == "urgent" && tasks[i].categoryboard != "done")
      tasksUrgent += 1;
  }
  if (window.location.pathname == "/board.html") {
    noTasksToDo();
  }
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

function rotateCardStart(i) {
  console.log(i + " aufgenommen");
  currentCardDragged = i;
  document.getElementById(`board-card${i}`).classList.add("rotate-card");
}

function rotateCardEnd() {
  let card = currentCardDragged;
  console.log(card + " losgelassen");
  document.getElementById(`board-card${card}`).classList.remove("rotate-card");
}

function openCard(i) {
  openCardContainer();
  renderCardInfo(i);
}

function openCardContainer() {
  document.getElementById("card-background").classList.remove("d-none");
  document.body.classList.add("background-fixed");
}
function closeCardContainer() {
  document.getElementById("card-background").classList.add("d-none");
  document.body.classList.remove("background-fixed");
}

function renderCardInfo(i){
  console.log('render Card')
}

function redirectOnWidth() {
  // Prüfen die Fensterbreite
  if (window.innerWidth <= 900) {
    // Weiterleitung zu AddTask Seite
    window.location.href = "./../addtask.html";
  }
}

// Führt die Function aus sobalt das Document vollständig geladen ist
document.addEventListener('DOMContentLoaded', redirectOnWidth);

// Führt die Function aus, wenn das Fenster neu skaliert wird
window.addEventListener('resize', redirectOnWidth);
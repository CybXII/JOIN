let currentDraggedElement;

let tasks = [
  {
    categoryboard: "todo",
    category: "to do Task",
    title: "Contact Form & Imprint",
    description: "Create a contact form and imprint page...",
    dueDate: "30.01.2024",
    priority: "medium",
    subtasks: ["Subtask1", "Subtask2", "Subtask3"],
    assignedTo: ["AB", "CD", "EF"],
  },
  {
    categoryboard: "in-progress",
    category: "in progress Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    priority: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
  {
    categoryboard: "await-feedback",
    category: "feedback Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    priority: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
  {
    categoryboard: "done",
    category: "done Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    priority: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["GH", "IJ", "KL"],
  },
];

function renderTasksHTML(i) {
  return /*html*/ `
<div class="card-board" draggable="true" ondragstart="moveToLocation(${i})" id="board-card${i}">
  <div class="frame-119">
    <div class="card-board-user-story">
      <span class="card-board-user-story-text">${tasks[i]["category"]}</span>
    </div>
    <div class="frame-114">
      <span class="card-board-title">${tasks[i]["title"]}</span>
      <span class="card-board-content">${tasks[i]["description"]}</span>
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
}


function moveToLocation(taskId) {
  currentDraggedElement = taskId;
  console.log(taskId);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}

function moveTo(category) {
  tasks[currentDraggedElement]["categoryboard"] = category;
  updateHTML();
  console.log(tasks[currentDraggedElement]["categoryboard"]);
}


function updateHTML() {

        document.getElementById("todo").innerHTML = '';
        document.getElementById("in-progress").innerHTML = '';
        document.getElementById("await-feedback").innerHTML = '';
        document.getElementById("done").innerHTML = '';

tasks.forEach(function(task, i) {
  document.getElementById(task.categoryboard).innerHTML += 
    `<div class="card-board" draggable="true" ondragstart="moveToLocation(${i})" id="board-card${i}">
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
     
}

function openAddTaskContainer(){
  document.getElementById("board-background").classList.remove('d-none');
  document.body.classList.add("background-fixed");
}
function closeAddTaskContainer(){
  document.getElementById("board-background").classList.add('d-none');
  document.body.classList.remove("background-fixed");
}

function dontClose(){
  event.stopPropagation();
  console.log(event);
}
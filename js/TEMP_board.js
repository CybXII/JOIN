let currentDraggedElement;

let tasks = [
  {
    category: "User Story",
    title: "Contact Form & Imprint",
    description: "Create a contact form and imprint page...",
    dueDate: "30.01.2024",
    priority: "medium",
    subtasks: ["Subtask1", "Subtask2", "Subtask3"],
    assignedTo: ["AS", "AS", "AS"],
  },
  {
    category: "Technical Task",
    title: "Test Technical Task Title",
    description: "Test Technical Task Description",
    dueDate: "25.01.2024",
    priority: "urgent",
    subtasks: ["Subtask4", "Subtask5", "Subtask6"],
    assignedTo: ["BT", "BT", "BT"],
  },
];

function renderTasksHTML(i) {
  return /*html*/ `
                  <div
                  class="card-board"
                  draggable="true"
                  ondragstart="moveToLocation('1')"
                  id="board-card${i}"
                >
    <div class="frame-119">
                    <div class="card-board-user-story">
                      <span class="card-board-user-story-text">${tasks[i]["category"]}</span>
                    </div>
                    <div class="frame-114">
                      <span class="card-board-title"
                        >${tasks[i]["title"]}</span
                      >
                      <span class="card-board-content"
                        >${tasks[i]["description"]}</span
                      >
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
                        <img
                          src="../img/prio-baja-board.svg"
                          class="card-board-priority-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>`;
}

function moveToLocation(id) {
  console.log(id);
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
  todos[currentDraggedElement]["category"] = category;
  updateHTML();
}

function updateHTML() {
  let open = todos.filter((t) => t["category"] == "open");

  document.getElementById("open").innerHTML = "";

  for (let index = 0; index < open.length; index++) {
    const element = open[index];
    document.getElementById("open").innerHTML += generateTodoHTML(element);
  }

  let closed = todos.filter((t) => t["category"] == "closed");

  document.getElementById("closed").innerHTML = "";

  for (let index = 0; index < closed.length; index++) {
    const element = closed[index];
    document.getElementById("closed").innerHTML += generateTodoHTML(element);
  }
}

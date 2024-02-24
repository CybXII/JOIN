let currentDraggedElement;
let currentCardDragged;
let tasksTodo;
let tasksDone;
let tasksInProgress;
let tasksAwaitFeedback;
let tasksUrgent;
let finishcounter = 0;

let tasks = [];

async function renderBoardTasks() {
  await loadUsersFromLocalStorage();
  await loadRemoteUser();
  await loadTasks();
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
  console.log(tasks[currentDraggedElement]["categoryboard"]);
  console.log("moveto");
}

async function updateHTML() {
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
      <span class="card-board-count-progress" id="subtask-counter${i}">

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
          if (j <= 3) {
            assigned.innerHTML += `
            <div class="card-board-profile-batch">
            <div class="group-9-board">
            <div class="group-9-text" style="background-color: ${colorbg}">${assign}</div>
            </div>
            </div>`;
          } else if (j == 4) {
            assigned.innerHTML += `
        <div class="card-board-profile-batch">
        <div class="group-9-board">
            <div id="grey_badge" class="group-9-text" style="background-color: grey;">+${j-3}</div>
            </div>
            </div>`;
          }
          else if(j>=5){
            document.getElementById('grey_badge').innerHTML = `+${j-3}`;
          }
          
        }
        finishedSubtasks(i);
        renderFinishCounter(i);
        finishcounter = 0;
      }
      );
      await setItem("tasks", JSON.stringify(tasks));
      setAmounts();
    }
    
    function openAddTaskContainer(categoryInput) {
      document.getElementById("board-background").classList.remove("d-none");
      document.body.classList.add("background-fixed");
  document
    .getElementById("addTaskForm")
    .setAttribute(
      "onsubmit",
      `addTasksToStorage('${categoryInput}'); return false;`
    );
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

function renderCardInfo(i) {
  let content = document.getElementById("card-background");
  let prioimg = prioImg(i);
  let parts = tasks[i].dueDate.split("-");
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]) - 1;
  let day = parseInt(parts[2]);
  let formattedDate =
    ("0" + day).slice(-2) + "." + ("0" + (month + 1)).slice(-2) + "." + year;

content.innerHTML = /*html*/ `<div class="card" onclick="dontClose()">
        <div class="card_header">
        <div class="card-board-user-story">
          <span class="card-board-user-story-text" id="card_category">${tasks[i].category}</span>
        </div>        
        <button class="close_card" onclick="closeCardContainer()"></button>
      </div>
    <div class=card_limiter>
      <div id="card_title" class="card_title">
        ${tasks[i].title}
      </div>
      <p id="card_description" class="card_description">${tasks[i].description}</p>
      <div class="main_infos_card"><p>Due date:</p><span>${formattedDate}</span></div>
      <div class="main_infos_card"><p>Priority:</p><span>${tasks[i].prio}</span><img src=${prioimg} alt=""></div>
      <div class="card_assigned">
        <p>Assigned To:</p>
        <div class="card_assignedTo" id="card_assignedTo">
          
        </div>
      </div>
      <div class="card_subtasks">
        <p>Subtasks</p>
        <div id="subtask-items"></div>
      </div>
    </div>
    <div class="card_buttons">
        <div class="card_div" onclick="editCard()">
          <img src="./img/pen.svg" alt=""/>
          <p>Edit</p>  
        </div>
        <div class="card_div" onclick="deleteTask(${i})">
          <img src="./img/trash.svg" alt=""/>
          <p>Delete</p>  
        </div>
      </div>
`;
  renderSubtasksInfos(i);

      
      let assignedTask = tasks[i].assignedTo;
      let colorsTask = tasks[i].colors;
      let userid = tasks[i].assignedToID;
      for (let x = 0; x < assignedTask.length; x++) {
        const initials = assignedTask[x];
        const colors = colorsTask[x];
        let assignNames = usersAssignTask(userid[x]);
        let assignTask = document.getElementById("card_assignedTo");
        assignTask.innerHTML += /*html*/ `<div class="contact">
            <div id="contact_color" class="overlap-group" style="background-color: ${colors}">
              <div class="text-wrapper-2">${initials}</div>
            </div>
            <div class="assigned_name">${assignNames}</div>
          </div>`; 
      }
}

function renderSubtasksInfos(i){
let subtasks = tasks[i].subtasks;
for (let j = 0; j < subtasks.length; j++) {
  const element = subtasks[j].subtaskName;
  if(subtasks[j]["subtaskStatus"]===false){
    let subtasksTask = document.getElementById("subtask-items");
    subtasksTask.innerHTML += /*html*/ `<div class="card_subtasks_item">
      <input id="subtask${j}" type="checkbox" class="card_checkbox" onclick="checkSubtasks(${i},${j})">
      <p>${element}</p>
    </div>`;  
  } else{
    let subtasksTask = document.getElementById("subtask-items");
    subtasksTask.innerHTML += /*html*/ `<div class="card_subtasks_item">
      <input checked id="subtask${j}" type="checkbox" class="card_checkbox" onclick="checkSubtasks(${i},${j})">
      <p>${element}</p>
    </div>`;  
  }
}
}

function finishedSubtasks(tasksid) {
  
  
  tasks[tasksid].subtasks.forEach((subtask) => {
    
    if (subtask["subtaskStatus"] == true){
      finishcounter++
    }
    // 
    // return finishcounter;
  });
  let percent = finishcounter / tasks[tasksid].subtasks.length * 100;
  renderSubtasksBar(percent.toFixed(0));
}

function renderSubtasksBar(percent){
  console.log(percent);
}

function renderFinishCounter(id){
document.getElementById(`subtask-counter${id}`).innerHTML = 
`${finishcounter}/${tasks[id]["subtasks"].length} Subtasks`;

}


function usersAssignTask(userid){

    for (let i = 0; i < remoteuserAssign.length; i++) {
      if (remoteuserAssign[i].id === userid) {
        return remoteuserAssign[i].name;
      }
    }
}

function prioImg(i) {
  if (tasks[i].prio == "medium") {
    return `./img/medium_nofill.svg`;
  } else if (tasks[i].prio == "urgent") {
    return `./img/urgent_nofill.svg`;
  } else if (tasks[i].prio == "low") {
    return `./img/low_nofill.svg`;
  }
}

function filterTaskBoard() {
  let searchInput = document.getElementById("search_board").value;
  let categorys = ["todo", "in-progress", "await-feedback", "done"];
  categorys.forEach((element) => {
    clearBoardCategory(element);
    filterCategory(element, searchInput);
    console.log(`startfilter ${searchInput}`);
  });
}

function clearBoardCategory(categorys) {
  document.getElementById(categorys).innerHTML = "";
}

function filterCategory(categorys, searchInput) {
  tasks.forEach(function (task, i) {
    let checkTitlel = task["title"];
    let checkInfos = task["description"];
    if (task.categoryboard === categorys) {
      if (
        checkTitlel.includes(searchInput) ||
        checkInfos.includes(searchInput)
      ) {
        renderFilteredCard(task, i, categorys);
      }
    }
  });
}

function renderFilteredCard(task, i, categorys) {
  document.getElementById(categorys).innerHTML += `
  <div class="card-board" draggable="true" ondragstart="rotateCardStart(${i}),moveToLocation(${i}),highlight()" id="board-card${i}" onclick="openCard(${i})" ondragend="rotateCardEnd()">
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
          1/${task.subtasks.length} Subtasks
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
}

async function deleteTask(i) {
  tasks.splice(i, 1);
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
  closeCardContainer();
}


async function checkSubtasks(i, j){
  let status = document.getElementById(`subtask${j}`).checked;
  tasks[i].subtasks[j]["subtaskStatus"] = status;
  await setItem("tasks", JSON.stringify(tasks));
}
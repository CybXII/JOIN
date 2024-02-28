let currentDraggedElement;
let currentCardDragged;
let tasksTodo;
let tasksDone;
let tasksInProgress;
let tasksAwaitFeedback;
let tasksUrgent;
let finishcounter = 0;
let tasks = [];
let editTaskPriority;
let currentTask = [];
let filteredTasks


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
  closeCardContainer();
}


async function updateHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  tasks.forEach(function (task, i) {
      renderUpdateHTML(task,i);
      renderUpdateAssigned(task,i);
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
  usersassignedto=[];
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
  checkCases(tasks,i);
  if (tasks[i].prio == "urgent" && tasks[i].categoryboard != "done")
    tasksUrgent += 1;
  }
  if (window.location.pathname == "/board.html") {
    noTasksToDo();
  }
}


function checkCases(tasks,i){
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


async function openCard(i) {
  await loadTasks();
  currentTask = tasks[i];
  openCardContainer();
  renderCardInfo(i);
  renderSubtasksInfos(i);
  renderAssigned(i);
  setAssignedUserHelp(editingCard);
}


function openCardContainer() {
  document.getElementById("card-background").classList.remove("d-none");
  document.body.classList.add("background-fixed");
}


function closeCardContainer() {
  usersassignedto=[];
  document.getElementById("card-background").classList.add("d-none");
  document.body.classList.remove("background-fixed");
  document.getElementById("card-background").innerHTML ="";
}


function finishedSubtasks(tasksid) {
  tasks[tasksid].subtasks.forEach((subtask) => {
    if (subtask["subtaskStatus"] == true){
      finishcounter++
    }
  });
  let percent = finishcounter / tasks[tasksid].subtasks.length * 100;
  let percenttwo = percent.toFixed(0);
  document.getElementById(`progress-bar-${tasksid}`).style = `width: ${percenttwo}%;`;
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
  });
  if (searchInput.length == 0) {
    renderBoardTasks();    
  }
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
        checkTitlel.toUpperCase().includes(searchInput.toUpperCase()) ||
        checkInfos.toUpperCase().includes(searchInput.toUpperCase())
      ) {
        renderUpdateHTML(task,i);
        renderUpdateAssigned(task,i);
        finishedSubtasks(i);
        renderFinishCounter(i);
        finishcounter = 0;
        }
    }
  });
}


async function deleteTask(i) {
  tasks.splice(i, 1);
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
  closeCardContainer();
}


async function checkSubtasks(i, j){
  let status = document.getElementById(`subtask${j}`).checked;
  currentTask.subtasks[j]["subtaskStatus"] = status;
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
}


function addSubtasksCard(i) {
  let subtaskstoadd = document.getElementById("edit-subtasks").value;
  if (subtaskstoadd) {
    let JSONToPush = {
      subtaskName: subtaskstoadd,
      subtaskStatus: false,
    };
    currentTask.subtasks.push(JSONToPush);
    document.getElementById("edit-subtasks").value = "";
    renderAddSubtasksCard(i);
  }
}


function deleteSubtaskCard(i, j) {
  currentTask.subtasks.splice(j, 1);
  renderAddSubtasksCard(j);
}


function showSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.remove("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.add("subtask-background");
}


function hideSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.add("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.remove("subtask-background");
}


function resetSubtasksCard() {
  document.getElementById("edit-subtasks").value = ``;
}


function usersAssignedToHelp(){
  currentTask['assignedToID'] = [];
  for (let i = 0; i < usersassignedto.length; i++) {
    let element = usersassignedto[i];
    element = element + 1;
    currentTask['assignedToID'].push(element);
  }
}


function setAssignedUserHelp(editingCard) {
  currentTask["assignedToID"].forEach((element) => {
    let id = element - 1;
    if (!usersassignedto.includes(id)) {
      usersassignedto.push(id);
      usersassignedto.sort();
    }
      if (!usersassignedto.includes(id)) {
        usersassignedto.push(id);
        usersassignedto.sort();
    } 
  });
}


function openBurgerBoard(event, i){
  console.log("burgermenu " + i + " geöffnet");
  currentDraggedElement = i;
  event.stopPropagation();
  openCardContainer();
  renderMoveToOptions();
  renderMoveToButtons(i);
}


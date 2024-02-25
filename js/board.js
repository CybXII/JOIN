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

function hideHighligts(){}


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


function renderUpdateAssigned(task,i){
  let assigned = document.getElementById(`assigned-to${i}`);
  for (let j = 0; j < task["assignedTo"].length; j++) {
    const assign = task["assignedTo"][j];
    const colorbg = task["colors"][j];
    if (j <= 3) {
      renderUpdateColoredBadges(assigned,colorbg,assign);
    } else if (j == 4) {
      renderUpdateGreyBadge(assigned,j);
    }
    else if(j>=5){
      document.getElementById('grey_badge').innerHTML = `+${j-3}`;
    } 
  }
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
        checkTitlel.toUpperCase().includes(searchInput.toUpperCase()) ||
        checkInfos.toUpperCase().includes(searchInput.toUpperCase())
      ) {
        renderFilteredCard(task, i, categorys);
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
  tasks[i].subtasks[j]["subtaskStatus"] = status;
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
}

function editCard(i){
  let content = document.getElementById("card-background");
  renderEditCard(content,i);
}

function editTasksfromStorage(){
  console.log('Hier kommt die save Edit funcion');
}

function editSubtasks(){
  console.log('Hier kommt die save Edit funcion');
}


function openEditAssignTo(){
    // renderAssignedUserAddTask();
    let assingBox = document.getElementById("edit-list1");
  
    // Überprüfe, ob die Klasse "visible" nicht enthalten ist, füge sie hinzu
    if (!assingBox.classList.contains("visible")) {
      assingBox.classList.add("visible");
      renderAssignedUserAddTask();
    } else {
      // Wenn "visible" enthalten ist, entferne es
      assingBox.classList.remove("visible");
    }
  
    // Überwache Klicks im Fenster, um die Liste zu verstecken, wenn außerhalb geklickt wird
    window.addEventListener("click", function (e) {
      if (!assingBox.contains(e.target)) {
        assingBox.classList.remove("visible");
        window.removeEventListener("click", arguments.callee); // Entferne den Event-Listener nach Ausführung
      }
    });
}
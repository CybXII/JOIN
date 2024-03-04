let currentdraggedelement;
let currentcarddragged;
let taskstodo;
let tasksdone;
let tasksinprogress;
let tasksawaitfeedback;
let tasksurgent;
let finishcounter = 0;
let tasks = [];
let edittaskpriority;
let currenttask = [];
let filteredtasks;


/**
 * Renders the board tasks by loading users from local storage, loading remote user, loading tasks, updating HTML, and updating classes of the board.
 *
 */
async function renderBoardTasks() {
  await loadRemoteUser();
  await loadTasks();
  updateHTML();
  removeActiveClass();
  setActivClass("board")
}


/**
 * Moves the current dragged element to a specified location.
 *
 * @param {type} taskId - The identifier of the location to move the element to
 */
function moveToLocation(taskId) {
  currentdraggedelement = taskId;
}


/**
 * Prevents the default behavior when a draggable element is being dragged over a drop target.
 *
 * @param {Event} ev - the event object representing the dragover event
 */
function allowDrop(ev) {
  ev.preventDefault();
}


/**
 * Function to remove highlight from specific elements.
 *
 */
function removeHighlight() {
  document.getElementById("drag-done").classList.add("d-none");
  document.getElementById("drag-todo").classList.add("d-none");
  document.getElementById("drag-in-progress").classList.add("d-none");
  document.getElementById("drag-await-feedback").classList.add("d-none");
}


/**
 * Function to highlight certain elements on the page based on the tasks' status.
 */
function highlight() {
  document.getElementById("drag-done").classList.remove("d-none");
  document.getElementById("drag-todo").classList.remove("d-none");
  document.getElementById("drag-in-progress").classList.remove("d-none");
  document.getElementById("drag-await-feedback").classList.remove("d-none");

  if (taskstodo == 0)
    document.getElementById("no-task-todo").classList.add("d-none");
  if (tasksinprogress == 0)
    document.getElementById("no-task-in-progress").classList.add("d-none");
  if (tasksawaitfeedback == 0)
    document.getElementById("no-task-await-feedback").classList.add("d-none");
  if (tasksdone == 0)
    document.getElementById("no-task-done").classList.add("d-none");
}


/**
 * Move the current dragged element to the specified category.
 *
 * @param {type} category - the category to move the element to
 */
function moveTo(category) {
  tasks[currentdraggedelement]["categoryboard"] = category;
  updateHTML();
  closeCardContainer();
}


/**
 * Asynchronously updates the HTML to reflect the current state of the tasks.
 *
 */
async function updateHTML() {
  document.getElementById("todo").innerHTML = "";
  document.getElementById("in-progress").innerHTML = "";
  document.getElementById("await-feedback").innerHTML = "";
  document.getElementById("done").innerHTML = "";
  tasks.forEach(function (task, i) {
    renderUpdateHTML(task, i);
    renderUpdateAssigned(task, i);
    finishedSubtasks(i);
    // renderFinishCounter(i);
    finishcounter = 0;
  });
  await setItem("tasks", JSON.stringify(tasks));
  setAmounts();
}


/**
 * Opens the add task container and sets up form submission for adding tasks to storage.
 *
 * @param {type} categoryinput - the category input for the task
 */
function openAddTaskContainer(categoryinput) {
  document.getElementById("board-background").classList.remove("d-none");
  document.getElementById("content-container").classList.add("overlap");
  document.body.classList.add("background-fixed");
  document
    .getElementById("addTaskForm")
    .setAttribute(
      "onsubmit",
      `addTasksToStorage('${categoryinput}'); return false;`
    );
  setTimeout(function () {
    window.removeEventListener("click", arguments.callee);
    document.addEventListener("click", clickOutsideHandler);
  }, 100);
}


/**
 * Handles click events outside the add task container.
 *
 * @param {Event} event - The click event object.
 */
function clickOutsideHandler(event) {
  var addtaskboard = document.querySelector(".add-task-board-card");
  var targetelement = event.target;
  if (!addtaskboard.contains(targetelement)) {
    closeAddTaskContainer();
    document.removeEventListener("click", clickOutsideHandler);
  } else {
  }
}


/**
 * Removes the click outside listener from the document.
 */
function removeClickOutsideListener() {
  document.removeEventListener("click", clickOutsideHandler);
}


/**
 * Closes the add task container and resets the usersassignedto array.
 */
function closeAddTaskContainer() {
  usersassignedto = [];
  document.getElementById("board-background").classList.add("d-none");
  document.getElementById("content-container").classList.remove("overlap");
  document.body.classList.remove("background-fixed");
}


/**
 * Set the amounts of different task statuses and perform additional actions if the current page is board.html.
 *
 * There are no parameters.
 * This function does not return any value.
 */
function setAmounts() {
  amountoftasks = tasks.length;
  taskstodo = 0;
  tasksdone = 0;
  tasksinprogress = 0;
  tasksawaitfeedback = 0;
  tasksurgent = 0;
  for (let i = 0; i < tasks.length; i++) {
    checkCases(tasks, i);
    if (tasks[i].prio == "urgent" && tasks[i].categoryboard != "done")
      tasksurgent += 1;
  }
  if (window.location.pathname == "/board.html") {
    noTasksToDo();
  }
}


/**
 * This function checks the category of a task and increments the corresponding counter.
 *
 * @param {array} tasks - The array of tasks to be checked
 * @param {number} i - The index of the task to be checked
 */
function checkCases(tasks, i) {
  switch (tasks[i].categoryboard) {
    case "todo":
      taskstodo += 1;
      break;
    case "in-progress":
      tasksinprogress += 1;
      break;
    case "await-feedback":
      tasksawaitfeedback += 1;
      break;
    case "done":
      tasksdone += 1;
      break;
    default:
      break;
  }
}


/**
 * Checks the number of tasks in different categories and updates the HTML content if there are no tasks.
 */
function noTasksToDo() {
  if (taskstodo == 0)
    document.getElementById("todo").innerHTML = noTasksToDoHtml("todo");
  if (tasksinprogress == 0)
    document.getElementById("in-progress").innerHTML =
      noTasksToDoHtml("in-progress");
  if (tasksawaitfeedback == 0)
    document.getElementById("await-feedback").innerHTML =
      noTasksToDoHtml("await-feedback");
  if (tasksdone == 0)
    document.getElementById("done").innerHTML = noTasksToDoHtml("done");
}


/**
 * Function to start the rotation of a card.
 *
 * @param {number} i - the index of the card to rotate
 */
function rotateCardStart(i) {
  currentcarddragged = i;
  document.getElementById(`board-card${i}`).classList.add("rotate-card");
}


/**
 * Function to end the rotation of a card.
 */
function rotateCardEnd() {
  let card = currentcarddragged;
  document.getElementById(`board-card${card}`).classList.remove("rotate-card");
}


/**
 * Opens a card with the given index.
 *
 * @param {number} i - The index of the card to be opened.
 * @return {Promise<void>} A promise that resolves when the card is successfully opened.
 */
async function openCard(i) {
  await loadTasks();
  currenttask = tasks[i];
  openCardContainer();
  renderCardInfo(i);
  renderSubtasksInfos(i);
  renderAssigned(i);
  setAssignedUserHelp(editingcard);
}


/**
 * Opens the card container by removing the "d-none" class from the element with the ID "card-background" and adding the "background-fixed" class to the body.
 */
function openCardContainer() {
  document.getElementById("card-background").classList.remove("d-none");
  document.body.classList.add("background-fixed");
  document
    .getElementById("card-background")
    .addEventListener("click", cardBackgroundClickHandler);
}


/**
 * Closes the card container by adding the "d-none" class to the element with the ID "card-background" and removing the "background-fixed" class from the body.
 */
function closeCardContainer() {
  usersassignedto = [];
  document.getElementById("card-background").classList.add("d-none");
  document.body.classList.remove("background-fixed");
  document
    .getElementById("card-background")
    .removeEventListener("click", cardBackgroundClickHandler);
}


/**
 * Handles click events on the card background to close the card container.
 *
 * @param {Event} event - The click event object.
 */
function cardBackgroundClickHandler(event) {
  if (event.target.id === "card-background") {
    closeCardContainer();
  }
}


/**
 * Calculate the percentage of completed subtasks and update the progress bar for the given task ID.
 *
 * @param {number} tasksid - The ID of the task
 */
function finishedSubtasks(tasksid) {
  if(tasks[tasksid].subtasks.length > 0){
    tasks[tasksid].subtasks.forEach((subtask) => {
      if (subtask["subtaskStatus"] == true) {
        finishcounter++;
      }
    });
    let percent = (finishcounter / tasks[tasksid].subtasks.length) * 100;
    let percenttwo = percent.toFixed(0);
    document.getElementById(
      `progress-bar-${tasksid}`
    ).style = `width: ${percenttwo}%;`;  
    renderFinishCounter(tasksid);
  } else{
    document.getElementById(`parent-progress-div${tasksid}`).innerHTML ="";
  }
}


/**
 * Finds the name of the user assigned to a task by their user ID.
 *
 * @param {number} userid - The user ID to search for
 * @return {string} The name of the user assigned to the task
 */
function usersAssignTask(userid) {
  for (let i = 0; i < remoteuserassign.length; i++) {
    if (remoteuserassign[i].id === userid) {
      return remoteuserassign[i].name;
    }
  }
}


/**
 * A function that returns an image path based on the priority of a task.
 *
 * @param {number} i - the index of the task
 * @return {string} the path of the image corresponding to the priority of the task
 */
function prioImg(i) {
  if (tasks[i].prio == "medium") {
    return `./img/medium_nofill.svg`;
  } else if (tasks[i].prio == "urgent") {
    return `./img/urgent_nofill.svg`;
  } else if (tasks[i].prio == "low") {
    return `./img/low_nofill.svg`;
  }
}


/**
 * Filters the task board based on the search input. Clears and filters each category, and renders all board tasks if the search input is empty.
 *
 * @param {string} searchinput - The value to search for in the task board
 */
function filterTaskBoard() {
  let searchinput = document.getElementById("search_board").value;
  let categorys = ["todo", "in-progress", "await-feedback", "done"];
  categorys.forEach(element => {
    renderNoFilteredFound(element);
  });
  categorys.forEach((element) => {
    filterCategory(element, searchinput);
  });
  if (searchinput.length == 0) {
    renderBoardTasks();
  }
}


/**
 * Clears the content of the specified board category element.
 *
 * @param {string} categorys - The ID of the board category element
 */
function clearBoardCategory(categorys) {
  document.getElementById(categorys).innerHTML = "";
}


/**
 * Sets the assigned user help for the given editing card.
 *
 * @param {Object} editingcard - the editing card for which the assigned user help is being set
 */
function setAssignedUserHelp(editingcard) {
  currenttask["assignedToID"].forEach((element) => {
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

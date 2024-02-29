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
let filteredTasks;

/**
 * Renders the board tasks by loading users from local storage, loading remote user, loading tasks, updating HTML, and updating classes of the board.
 *
 */
async function renderBoardTasks() {
  await loadRemoteUser();
  await loadTasks();
  updateHTML();
  classesBoard();
}


/**
 * Moves the current dragged element to a specified location.
 *
 * @param {type} taskId - The identifier of the location to move the element to
 */
function moveToLocation(taskId) {
  currentDraggedElement = taskId;
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

  if (tasksTodo == 0)
    document.getElementById("no-task-todo").classList.add("d-none");
  if (tasksInProgress == 0)
    document.getElementById("no-task-in-progress").classList.add("d-none");
  if (tasksAwaitFeedback == 0)
    document.getElementById("no-task-await-feedback").classList.add("d-none");
  if (tasksDone == 0)
    document.getElementById("no-task-done").classList.add("d-none");
}


/**
 * Move the current dragged element to the specified category.
 *
 * @param {type} category - the category to move the element to
 */
function moveTo(category) {
  tasks[currentDraggedElement]["categoryboard"] = category;
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
    renderFinishCounter(i);
    finishcounter = 0;
  });
  await setItem("tasks", JSON.stringify(tasks));
  setAmounts();
}


/**
 * Opens the add task container and sets up form submission for adding tasks to storage.
 *
 * @param {type} categoryInput - the category input for the task
 */
function openAddTaskContainer(categoryInput) {
  document.getElementById("board-background").classList.remove("d-none");
  document.getElementById("content-container").classList.add("overlap");
  document.body.classList.add("background-fixed");
  document
    .getElementById("addTaskForm")
    .setAttribute(
      "onsubmit",
      `addTasksToStorage('${categoryInput}'); return false;`
    );
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
  amountOfTasks = tasks.length;
  tasksTodo = 0;
  tasksDone = 0;
  tasksInProgress = 0;
  tasksAwaitFeedback = 0;
  tasksUrgent = 0;
  for (let i = 0; i < tasks.length; i++) {
    checkCases(tasks, i);
    if (tasks[i].prio == "urgent" && tasks[i].categoryboard != "done")
      tasksUrgent += 1;
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


/**
 * Checks the number of tasks in different categories and updates the HTML content if there are no tasks.
 */
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


/**
 * Function to generate HTML for a card board when there are no tasks to do.
 *
 * @param {string} id - The id of the card board
 * @return {string} The HTML for the card board with a message indicating no tasks to do
 */
function noTasksToDoHtml(id) {
  return `<div class="card-board-empty" id='no-task-${id}'>No tasks To do</div>`;
}


/**
 * Function to start the rotation of a card.
 *
 * @param {number} i - the index of the card to rotate
 */
function rotateCardStart(i) {
  currentCardDragged = i;
  document.getElementById(`board-card${i}`).classList.add("rotate-card");
}


/**
 * Function to end the rotation of a card.
 */
function rotateCardEnd() {
  let card = currentCardDragged;
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
  currentTask = tasks[i];
  openCardContainer();
  renderCardInfo(i);
  renderSubtasksInfos(i);
  renderAssigned(i);
  setAssignedUserHelp(editingCard);
}


/**
 * Opens the card container by removing the "d-none" class from the element with the ID "card-background" and adding the "background-fixed" class to the body.
 *
 */
function openCardContainer() {
  document.getElementById("card-background").classList.remove("d-none");
  document.body.classList.add("background-fixed");
}


/**
 * Closes the card container and clears the users assigned to the card.
 */
function closeCardContainer() {
  usersassignedto = [];
  document.getElementById("card-background").classList.add("d-none");
  document.body.classList.remove("background-fixed");
  document.getElementById("card-background").innerHTML = "";
}


/**
 * Calculate the percentage of completed subtasks and update the progress bar for the given task ID.
 *
 * @param {number} tasksid - The ID of the task
 */
function finishedSubtasks(tasksid) {
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
}


/**
 * Finds the name of the user assigned to a task by their user ID.
 *
 * @param {number} userid - The user ID to search for
 * @return {string} The name of the user assigned to the task
 */
function usersAssignTask(userid) {
  for (let i = 0; i < remoteuserAssign.length; i++) {
    if (remoteuserAssign[i].id === userid) {
      return remoteuserAssign[i].name;
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
 * @param {string} searchInput - The value to search for in the task board
 */
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

/**
 * Clears the content of the specified board category element.
 *
 * @param {string} categorys - The ID of the board category element
 */
function clearBoardCategory(categorys) {
  document.getElementById(categorys).innerHTML = "";
}


/**
 * Filter tasks based on a specific category and search input, and update the HTML accordingly.
 *
 * @param {array} categorys - The category to filter tasks by
 * @param {string} searchInput - The search input to filter tasks by
 */
function filterCategory(categorys, searchInput) {
  tasks.forEach(function (task, i) {
    let checkTitlel = task["title"];
    let checkInfos = task["description"];
    if (task.categoryboard === categorys) {
      if (
        checkTitlel.toUpperCase().includes(searchInput.toUpperCase()) ||
        checkInfos.toUpperCase().includes(searchInput.toUpperCase())
      ) {
        renderUpdateHTML(task, i);
        renderUpdateAssigned(task, i);
        finishedSubtasks(i);
        renderFinishCounter(i);
        finishcounter = 0;
      }
    }
  });
}


/**
 * Delete a task from the tasks list, update the stored tasks, update the HTML, and close the card container.
 *
 * @param {number} i - The index of the task to delete
 */
async function deleteTask(i) {
  tasks.splice(i, 1);
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
  closeCardContainer();
}


/**
 * Asynchronously checks the status of a subtask and updates the task list in the HTML.
 *
 * @param {number} i - The index of the subtask.
 * @param {number} j - The index of the current task.
 */
async function checkSubtasks(i, j) {
  let status = document.getElementById(`subtask${j}`).checked;
  currentTask.subtasks[j]["subtaskStatus"] = status;
  await setItem("tasks", JSON.stringify(tasks));
  updateHTML();
}


/**
 * Adds a subtask to the current task based on the input value from the "edit-subtasks" element.
 *
 * @param {type} i - description of parameter
 * @return {type} description of return value
 */
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


/**
 * Deletes a subtask card from the current task.
 *
 * @param {number} i - index of the current task
 * @param {number} j - index of the subtask to be deleted
 */
function deleteSubtaskCard(i, j) {
  currentTask.subtasks.splice(j, 1);
  renderAddSubtasksCard(j);
}


/**
 * Function to show subtask icons card.
 *
 * @param {number} i - The first parameter representing some value.
 * @param {number} j - The second parameter representing some value.
 */
function showSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.remove("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.add("subtask-background");
}


/**
 * Hides the subtask icons card for a given index.
 *
 * @param {number} i - The index of the subtask icons card to hide
 * @param {number} j - Another parameter description
 */
function hideSubtaskIconsCard(i, j) {
  document.getElementById(`subtask-icons-${i}`).classList.add("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.remove("subtask-background");
}


/**
 * Resets the subtasks card by clearing the value of the "edit-subtasks" element.
 *
 */
function resetSubtasksCard() {
  document.getElementById("edit-subtasks").value = ``;
}


/**
 * Assigns users to help with the current task.
 *
 */
function usersAssignedToHelp() {
  currentTask["assignedToID"] = [];
  for (let i = 0; i < usersassignedto.length; i++) {
    let element = usersassignedto[i];
    element = element + 1;
    currentTask["assignedToID"].push(element);
  }
}


/**
 * Sets the assigned user help for the given editing card.
 *
 * @param {Object} editingCard - the editing card for which the assigned user help is being set
 */
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


/**
 * Opens the burger board and performs related actions.
 *
 * @param {Event} event - The event triggering the function
 * @param {number} i - The index parameter
 */
function openBurgerBoard(event, i) {
  currentDraggedElement = i;
  event.stopPropagation();
  openCardContainer();
  renderMoveToOptions();
  renderMoveToButtons(i);
}
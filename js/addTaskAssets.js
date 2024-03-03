let inputChecker = false;

document.addEventListener("DOMContentLoaded", configureDatePicker);


/**
 * Configures the date picker by setting the minimum date allowed.
 *
 */
function configureDatePicker() {
  function setMinDate() {
    let today = new Date();
    let day = ("0" + today.getDate()).slice(-2);
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let formattedDate = today.getFullYear() + "-" + month + "-" + day;
    let datePicker = document.getElementById("datePicker");
    datePicker.setAttribute("min", formattedDate);
  }
  setMinDate();
}


/**
 * A function to handle the priority of a task.
 *
 * @param {number} i - the priority value
 * @param {string} handler - the handler type
 */
function taskPriorityChoosed(i, handler) {
  if (handler === "edit-") {
    taskpriority = i;
    taskPriorityActive(handler);
  } else {
    handler = "";
    taskpriority = i;
    taskPriorityActive(handler);
  }
}


/**
   * Deletes a subtask at the specified index.
   *
   * @param {number} i - The index of the subtask to delete
   */
function deleteSubtask(i) {
  subtasksAdd.splice(i, 1);
  renderAddSubtasks();
}


/**
   * Shows subtask icons and adds a background to the specified subtask.
   *
   * @param {number} i - The index of the subtask
   */
function showSubtaskIcons(i) {
  document.getElementById(`subtask-icons-${i}`).classList.remove("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.add("subtask-background");
}


/**
   * Hides the subtask icons and removes the subtask background for the given index.
   *
   * @param {number} i - The index of the subtask
   */
function hideSubtaskIcons(i) {
  document.getElementById(`subtask-icons-${i}`).classList.add("d-none");
  document
    .getElementById(`subtask-comp-${i}`)
    .classList.remove("subtask-background");
}


/**
   * Function to handle task priority and render corresponding UI.
   *
   * @param {function} handler - The handler function for rendering UI.
   */
function taskPriorityActive(handler) {
  if (taskpriority == "urgent") {
    renderUrgent(handler);
  } else if (taskpriority == "medium") {
    renderMedium(handler);
  } else if (taskpriority == "low") {
    renderLow(handler);
  }
}


/**
 * Set event listener on the parent div to handle click events outside of the div.
 *
 * @param {Object} parent_div - the parent div to attach the event listener to
 */
function setEventListenerSubtask(parent_div) {
  window.addEventListener("click", function(e) {
    if (!parent_div.contains(e.target)) {
      inputField = document.getElementById("subtasks").value;
      if (!inputField || inputField == "") {
        document
          .getElementById("subtask_add_button")
          .classList.remove("d-none");
        document.getElementById("subtask_seperator").classList.add("d-none");
        document
          .getElementById("subtask_accept_button")
          .classList.add("d-none");
        document
          .getElementById("subtask_cancel_button")
          .classList.add("d-none");
        window.removeEventListener("click", arguments.callee);
      } else if (inputField.length < 0) {
        window.removeEventListener("click", arguments.callee);
      }
    }
  });
}


/**
 * Add tasks to storage.
 *
 * @param {type} categoryInput - input for category
 */
function addTasksToStorage(categoryInput) {
  checkInputFields(categoryInput);
  if(inputChecker === true){
    setInitials();
    pushCategoryToJSON();
    addTasktoBoard(categoryInput);
    taskAddedCompleteText();
    taskAddedCompleteTextBoard();
  }
}


/**
 * Function to show and then hide the message box background after a delay of 2000 milliseconds.
 *
 */
function taskAddedCompleteTextBoard() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
  }, 2000);
}


/**
 * Performs a check before making changes based on the provided title, date, category, and category input.
 *
 * @param {string} title - The title parameter
 * @param {string} date - The date parameter
 * @param {string} category - The category parameter
 * @param {string} categoryInput - The category input parameter
 */
function checkInputFields(categoryInput) {
  let title = document.getElementById("task-title").value;
  let date = document.getElementById("datePicker").value;
  let category = document.getElementById("category-list2").value;
  checkBeforChange(title, date, category, categoryInput);
}


/**
 * Check before making changes based on the provided title, date, category, and category input.
 *
 * @param {string} title - The title input
 * @param {string} date - The date input
 * @param {string} category - The selected category
 * @param {string} categoryInput - The category input
 */
function checkBeforChange(title, date, category, categoryInput) {
  if (date != "" && title != "" && category != "Select Task Category") {
    inputChecker = true;
  } else {
    changeStateCategoryInput(category);
    changeStateDateInput(date);
    changeStateTitleInput(title);
  }
}


/**
   * Change the state of the category input based on the selected category.
   *
   * @param {string} category - The selected category
   */
function changeStateCategoryInput(category) {
  if (category === "Select Task Category") {
    document.getElementById("category-border").classList.add("redBorder");
    document.getElementById("warning-info-2").style = "display: block";
    document
      .getElementById("category-list2")
      .setAttribute("onchange", `checkInputFields('todo')`);
  } else if (category != "" && category != "Select Task Category") {
    document.getElementById("warning-info-2").style = "display: none";
    document.getElementById("category-border").classList.remove("redBorder");
  }
}


/**
 * Changes the state of the date input based on the provided date.
 *
 * @param {string} date - The date input value
 */
function changeStateDateInput(date) {
  if (date === "") {
    document.getElementById("datePicker").classList.add("redBorder");
    document.getElementById("warning-info-3").style = "display: block";
    document
      .getElementById("datePicker")
      .setAttribute("onchange", `checkInputFields('todo')`);
  } else if (date != "") {
    document.getElementById("warning-info-3").style = "display: none";
    document.getElementById("datePicker").classList.remove("redBorder");
  }
}


/**
   * Function to change the state of the title input based on the input value.
   *
   * @param {string} title - The input title value
   */
function changeStateTitleInput(title) {
  if (title === "") {
    document.getElementById("warning-info-1").style = "display: block";
    document.getElementById("task-title").classList.add("redBorder");
    document.getElementById("task-title").setAttribute("onkeyup", `checkInputFields('todo')`);
  } else if (title != "") {
    document.getElementById("warning-info-1").style = "display: none";
    document.getElementById("task-title").classList.remove("redBorder");
  }
}


/**
 * Change the buttons and set an event listener for subtasks.
 *
 * @param {Event} event - The event object
 */
function changeButtons(event) {
    event.preventDefault();
    parent_div = document.getElementById("parent_subtasks");
    document.getElementById("subtask_add_button").classList.add("d-none");
    document.getElementById("subtask_seperator").classList.remove("d-none");
    document.getElementById("subtask_accept_button").classList.remove("d-none");
    document.getElementById("subtask_cancel_button").classList.remove("d-none");
    setEventListenerSubtask(parent_div);
  }

  /**
 * Function to show a message box, set form validation to false, then redirect to the board page after a delay.
 *
 * @param {} - No parameters
 * @return {} - No return value
 */
function taskAddedCompleteText() {
  document.getElementById("msgBox-bg").classList.remove("d-none");
  document.querySelector("form").noValidate = true;
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    location.href = "./board.html";
  }, 2000);
}


/**
 * Function to show a message box with a information for the user, then removes the message from to the board after a delay.
 *
 * @param {} - No parameters
 * @return {} - No return value
 */
function subtasksMessage() {
  document.getElementById("msgBox").innerHTML= 'Minimum 1 Letter';
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    document.getElementById("msgBox").innerHTML= 'Task added to Board';
  }, 2000);
}
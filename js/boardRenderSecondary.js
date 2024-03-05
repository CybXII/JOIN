

/**
 * Renders the edit subtasks section in the given element with the provided content, index i, and index j.
 *
 * @param {Element} element - the element to render the subtasks in
 * @param {HTMLElement} content - the content to append the subtask HTML to
 * @param {number} i - the index of the parent task
 * @param {number} j - the index of the subtask
 */
function renderEditSubtasks(element, content, i, j) {
  content.innerHTML += /*html*/ `
  <div id="subtask-comp-${j}">
  <div class="subtask-comp" onmouseover="showSubtaskIconsCard(${j})" onmouseleave="hideSubtaskIconsCard(${j})">
                  <span class="subtask-task" id='subtask${j}' ondblclick="editSubtaskCard(${i},${j})" 
                    >⦁ ${element}</span
                  >
                  <div class="sub-icons d-none" id="subtask-icons-${j}">
                    <img
                      src="./img/edit.svg"
                      alt=""
                      onclick="editSubtaskCard(${i},${j})"
                      class="subtask-icon"
                    />
                    <img src="./img/Vector 19.svg" alt="" />
                    <img
                      src="./img/delete.svg"
                      alt=""
                      onclick="deleteSubtaskCard(${i},${j})"
                      class="subtask-icon"
                    />
                  </div>
                </div>
                </div>
</div>`;
}


/**
   * Renders the card information based on the given index.
   *
   * @param {number} i - The index of the card to render
   */
function renderCardInfo(i) {
  let content = document.getElementById("card-background");
  let prioimg = prioImg(i);
  let parts = tasks[i].dueDate.split("-");
  let year = parseInt(parts[0]);
  let month = parseInt(parts[1]) - 1;
  let day = parseInt(parts[2]);
  let formatteddate =
    ("0" + day).slice(-2) + "." + ("0" + (month + 1)).slice(-2) + "." + year;
  content.innerHTML = /*html*/ `
  <div class="card" onclick="dontClose()">
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
        <p id="card_description" class="card_description">${tasks[i]
          .description}</p>
        <div class="main_infos_card"><p>Due date:</p><span>${formatteddate}</span></div>
        <div class="main_infos_card"><p>Priority:</p><span>${tasks[i]
          .prio}</span><img src=${prioimg} alt=""></div>
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
          <div class="card_div" onclick="editCard(${i}), editSubtasks(${i}), setBadgesAddTaskEdit()">
            <img src="./img/pen.svg" alt=""/>
            <p>Edit</p>  
          </div>
          <div class="card_div" onclick="deleteTask(${i})">
            <img src="./img/trash.svg" alt=""/>
            <p>Delete</p>  
          </div>
      </div>`;
}


/**
 * Renders a message indicating that no tasks were found for the specified category.
 *
 * @param {string} categorys - The category for which no tasks were found
 */
function renderNoFilteredFound(categorys){
  document.getElementById(`${categorys}`).innerHTML =`
  <div class="card-board-empty" id="no-task-found">No tasks Found</div>
  `
}


/**
 * Sets a success message for deleting a task, displays the message box, and then hides it after 2 seconds.
 *
 * @param None
 * @return None
 */
function deleteTaskMessage() {
  document.getElementById("msgBox").innerHTML = "Task sucessfully deleted";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    document.getElementById("msgBox").innerHTML = "Task added to Board";
  }, 2000);
}


/**
 * Function to edit the message on the board for subtasks.
 *
 */
function subtasksMessageEditBoard() {
  document.getElementById("msgBox").innerHTML = "Task sucessfully edited";
  document.getElementById("msgBox-bg").classList.remove("d-none");
  setTimeout(() => {
    document.getElementById("msgBox-bg").classList.add("d-none");
    document.getElementById("msgBox").innerHTML = "Task added to Board";
  }, 2000);
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
 * Renders filtered tasks with the specified category, task, and index.
 *
 * @param {type} categorys - description of categorys
 * @param {type} task - description of task
 * @param {type} i - description of i
 * @return {type} description of return value
 */
function renderFilteredTasks(categorys,task,i){
  clearBoardCategory(categorys);
  renderUpdateHTML(task, i);
  renderUpdateAssigned(task, i);
  finishedSubtasks(i);
  finishcounter = 0;
}
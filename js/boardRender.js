/**
 * Renders the edit card with the given content and index.
 *
 * @param {HTMLElement} content - the content to be rendered in the edit card
 * @param {number} i - the index of the edit card
 * @return {void} 
 */
function renderEditCard(content, i) {
  content.innerHTML = `
    <div class="edit-card" onclick="dontClose()">
    <div class="close_button_div">
    <button class="close_card" onclick="closeCardContainer()"></button>
    </div> 
    <form
      id="editTaskForm"
      class="edit-addTask_helper"
      onsubmit="editTasksfromStorage(${i}); return false; closeCardContainer(); return false;"
      >
      <div class="edit-input-fields">
        <div class="edit-frame-219">
          <div class="title-v1">
            <div class="title">Title<span class="red">*</span></div>
            <div class="frame-203">
              <div class="frame-14">
                <input
                  class="input-title"
                  placeholder="Enter a title"
                  type="text"
                  name="title"
                  id="edit-task-title"
                  value="${tasks[i]["title"]}"
                />
              </div>
            </div>
          </div>
          <div class="description-v1">
            <span>Description</span>
            <div class="frame-207">
              <div class="frame-17">
                <textarea
                  class="input-title"
                  placeholder="Enter a Description"
                  type="text"
                  name="description"
                  id="edit-task-description"
                >${tasks[i]["description"]}</textarea>
              </div>
            </div>
          </div>
          <div class="asigned-to-v1">
            <span class="assigned-to">Assigned to</span>
            <div id="edit-list1" class="dropdown-check-list" tabindex="100">
              <div onclick="renderAssignedTo('edit-'),openEditAssignTo(${i}, 'edit-')">
                <span class="anchor">Select contacts to assign</span>
              </div>
              <ul class="items">
                <div id="edit-assigned-list"></div>
              </ul>
            </div>
          </div>
          <div
            class="assigned-to-add-task-list"
            id="edit-assigned-to-add-task-list"
          ></div>
        </div>
        <div class="edit-frame-39">
          <div class="due-date-v1">
            <div for="title">Due date<span class="red">*</span></div>
            <div class="frame-211">
              <div class="frame-15">
                <input
                  class="input-title"
                  type="date"
                  id="edit-datePicker"
                  value="${tasks[i]["dueDate"]}"
                />
              </div>
            </div>
          </div>
          <div class="frame-28">
            <div for="title">Prio</div>
            <div class="priority">
              <div
                class="frame-16"
                id="edit-prio-urgent"
                onclick="taskPriorityChoosed('urgent','edit-');"
              >
                <span>Urgent</span>
                <img
                  id="edit-prio-urgent-img"
                  src="./img/urgent_nofill.svg"
                  alt="prio-alta-red"
                />
              </div>
              <div
                class="frame-25-active"
                id="edit-prio-medium"
                onclick="taskPriorityChoosed('medium','edit-');"
              >
                <span>Medium</span>
                <img
                  id="edit-prio-medium-img"
                  src="./img/medium_fill.svg"
                  alt="prio-media"
                />
              </div>
              <div
                class="frame-26"
                id="edit-prio-low"
                onclick="taskPriorityChoosed('low','edit-');"
              >
                <span>Low</span>
                <img
                  id="edit-prio-low-img"
                  src="./img/low_nofill.svg"
                  alt="prio-baja"
                />
              </div>
            </div>
          </div>
          <div class="category">
            <div for="title">Category<span class="red">*</span></div>
            <div id="edit-list2" class="dropdown-check-list2" tabindex="100">
              <div onclick="openEditCategory()">
                <span id="edit-category-border" class="anchor">
                  <span id="parent-edit_items">${tasks[i]["category"]}</span>
                </span>
              </div>
              <ul class="items">
                <div id="edit-category-list2-items">
                  <li onclick="fillInputField('Technical Task','edit-')">
                    Technical Task
                  </li>
                  <li onclick="fillInputField('User Story','edit-')">
                    User Story
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div class="subtask-v1-reconstrution">
            <div>Subtasks</div>
            <div id="edit-parent_subtasks" class="frame-18">
              <input
                id="edit-subtasks"
                type="text"
                onclick="changeButtonsCard(event)"
                class="subtasks"
                placeholder="Add new subtask"
              />
              <div class="subtasks_buttons">
                <img
                  id="edit-subtask_add_button"
                  class="subtask_add_button"
                  src="../img/add_icon.svg"
                  alt=""
                />
                <img
                  id="edit-subtask_cancel_button"
                  onclick="resetSubtasksCard()"
                  class="subtask_add_button d-none"
                  src="../img/cancel.svg"
                  alt=""
                />
                <img
                  id="edit-subtask_seperator"
                  class="subtask_add_button d-none"
                  src="../img/subtask_seperator.svg"
                  alt=""
                />
                <img
                  id="edit-subtask_accept_button"
                  class="subtask_add_button d-none"
                  src="../img/subtasks_add.svg"
                  alt=""
                  onclick="addSubtasksCard(${i})"
                />
              </div>
            </div>
            <div
              class="subtasks-container"
              id="edit-subtasks-container"
            ></div>
          </div>
        </div>
      </div>
      <div class="edit-frame-27">
          <button class="primary-check-button" type="submit" onclick="">
            <span>OK</span>
            <img
              src="../img/check-out-wheite.svg"
              alt="check-out-wheite"
            />
          </button>
      </div>
    </form>
    </div>
  `;
}

function renderMoveToOptions() {
  document.getElementById("card-background").innerHTML = `
    <div class="card" onclick="dontClose()">
      <div class="card_header">
        <h1>Select the Category to move</h1>     
        <button class="close_card" onclick="closeCardContainer()"></button>
      </div>
      <div class="card_limiter">
          <div id="moveButtons"></div>
      </div>
  
    </div>
    `;
}

function renderMoveToButtons(taskID) {
  let buttons = document.getElementById("moveButtons");
  if (tasks[taskID]["categoryboard"] === "todo") {
    buttons.innerHTML = `
      <button class="move_btn" onclick="moveTo('in-progress')">In Progress</button>
      <button class="move_btn" onclick="moveTo('await-feedback')">Await Feedback</button>
      <button class="move_btn" onclick="moveTo('done')">Done</button>
      `;
  } else if (tasks[taskID]["categoryboard"] === "in-progress") {
    buttons.innerHTML = `
      <button class="move_btn" onclick="moveTo('todo')">Todo</button>
      <button class="move_btn" onclick="moveTo('await-feedback')">Await Feedback</button>
      <button class="move_btn" onclick="moveTo('done')">Done</button>
      `;
  } else if (tasks[taskID]["categoryboard"] === "await-feedback") {
    buttons.innerHTML = `
      <button class="move_btn" onclick="moveTo('todo')">Todo</button>
      <button class="move_btn" onclick="moveTo('in-progress')">In Progress</button>
      <button class="move_btn" onclick="moveTo('done')">Done</button>
      `;
  } else if (tasks[taskID]["categoryboard"] === "done") {
    buttons.innerHTML = `
      <button class="move_btn" onclick="moveTo('todo')">Todo</button>
      <button class="move_btn" onclick="moveTo('in-progress')">In Progress</button>
      <button class="move_btn" onclick="moveTo('await-feedback')">Await Feedback</button>
      `;
  }
}

function renderAddSubtasksCard(i) {
  document.getElementById("edit-subtasks-container").innerHTML = "";
  for (let j = 0; j < currentTask.subtasks.length; j++) {
    const element = currentTask.subtasks[j].subtaskName;
    let content = document.getElementById("edit-subtasks-container");
    content.innerHTML += /*html*/ `
      <div id="subtask-comp-${j}">
      <div class="subtask-comp" onmouseover="showSubtaskIconsCard(${j},${i})" onmouseleave="hideSubtaskIconsCard(${j},${i})">
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
}

function renderBadgesAddTaskEdit() {
  for (let i = 0; i < userInitialsAssignedtoBadges.length; i++) {
    const initials = userInitialsAssignedtoBadges[i];
    const color = userColorsAssignedtoBadges[i];
    let content = document.getElementById("edit-assigned-to-add-task-list");
    renderBadgesEdit(initials, color, content, i);
  }
}


function renderBadgesEdit(initials, color, content, i) {
  if (i <= 3) {
    content.innerHTML += /*html*/ `<div class="assigned-to-add-task-user" style="background-color: ${color}">${initials}</div>`;
  }
  if (i == 4) {
    content.innerHTML += /*html*/ `<div id="grey_badge" class="assigned-to-add-task-user" style="background-color: grey">+${i -
      3}</div>`;
  }
  if (i > 4) {
    document.getElementById("grey_badge").innerHTML = /*html*/ `+${i -
      3}</div>`;
  }
}


function changeButtonsCard(event) {
  event.preventDefault();
  parent_div = document.getElementById("edit-parent_subtasks");
  document.getElementById("edit-subtask_add_button").classList.add("d-none");
  document.getElementById("edit-subtask_seperator").classList.remove("d-none");
  document
    .getElementById("edit-subtask_accept_button")
    .classList.remove("d-none");
  document
    .getElementById("edit-subtask_cancel_button")
    .classList.remove("d-none");
  setEventListenerSubtask(parent_div);
}


function editSubTaskHtmlCard(textContent, i, j) {
  return /*html*/ `
        <div class="editSubTaskButtonBox" id="subtask-icons-${j}"></div> 
      <div class="subtask-edit-container">
        <input id="editSubTaskInput" type="text" class="sub-edit-input" value=${textContent} />
        <div class="sub-icons">
        <img src="./img/delete.svg" class="subtask-icon-edit" onclick="deleteSubtaskCard(${i},${j})"/>
          <img src="./img/Vector 19.svg" alt="" />
          <img src="./img/check.svg" alt="check" class="subtask-icon-edit" onclick="addEditSubTaskCard(${i},${j})"/>
          </div>
        </div>
      </div>
    `;
}


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
  let formattedDate =
    ("0" + day).slice(-2) + "." + ("0" + (month + 1)).slice(-2) + "." + year;

  content.innerHTML = /*html*/ `
  <div class="card" onclick="dontClose()">
          <div class="card_header">
          <div class="card-board-user-story">
            <span class="card-board-user-story-text" id="card_category">${tasks[
              i
            ].category}</span>
          </div>        
          <button class="close_card" onclick="closeCardContainer()"></button>
        </div>
      <div class=card_limiter>
        <div id="card_title" class="card_title">
          ${tasks[i].title}
        </div>
        <p id="card_description" class="card_description">${tasks[i]
          .description}</p>
        <div class="main_infos_card"><p>Due date:</p><span>${formattedDate}</span></div>
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


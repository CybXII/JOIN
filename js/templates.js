// TODO: NUR DYNAMISCHEN INHALT RENDERN

async function includeHTMLInit(input) {
  let functionName = `render${input}`;
  await includeHTML();

  // Überprüfen, ob die Funktion im globalen Kontext vorhanden ist
  if (typeof window[functionName] === "function") {
    window[functionName]();
    document.getElementById("header-initials").innerHTML = users[0].initials;
  } else {
    console.error(`Die Funktion ${functionName} wurde nicht gefunden.`);
  }
}

function renderSignUpHTML() {
  return /*html*/ `
  <div class="frame-159-su">
    <img
    src="./img/arrow-left-line.svg"
    class="arrow-left-line"
    onclick="renderLogin()"
    />
    <span class="sign-up-text">Sign up</span>
    <img src="./img/vector-5.svg" alt="" />
  </div>
  <div class="frame-212-su">
    <div class="frame-160-su">
      <div class="frame-155-su">
        <div class="frame-14-su">
          <div
            id="parent_name"
            class="frame-wrapper"
            for="name"
            aria-selected="false"
          >
            <input
              type="name"
              class="frame-14"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Name"
              autocomplete="Name"
              required
              oninvalid="this.setCustomValidity('Geben sie ihren Namen ein')"
              oninput="this.setCustomValidity('')"
            />
            <img src="./img/person-su.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="frame-157-su">
        <div class="frame-14-su">
          <div
            id="parent_email"
            class="frame-wrapper"
            for="email"
            aria-selected="false"
          >
            <input
              type="email"
              class="frame-14"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Email"
              autocomplete="email"
              required
              oninvalid="this.setCustomValidity('Geben ihre Email Adresse ein!')"
              oninput="this.setCustomValidity('')"
            />
            <img src="./img/mail.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="frame-158">
        <div id="parent_password" for="password" class="frame-wrapper">
          <input
            type="password"
            class="frame-14"
            id="password-su"
            autocomplete="new-password"
            placeholder="Password"
            required
            oninvalid="this.setCustomValidity('Geben sie ihr Passwort ein!')"
            oninput="this.setCustomValidity('')"
            onkeyup="signUpPasswordValidation()"
          />
          <img id="password_locker" class="img" src="img/lock.svg" onclick="changeLockerPicture('parent_password')" alt="locker spicture" />
        </div>
      </div>
      <div class="frame-156-su">
        <div class="frame-14-su">
          <div
            id="parent_confirm_password"
            for="password"
            class="frame-wrapper"
          >
            <input
              type="password"
              class="frame-14"
              id="confirm_password"
              autocomplete="new-password"
              placeholder="Confirm Password"

              onkeyup="signUpPasswordValidation()"
            />
            <img id="confirm_locker" class="img" src="img/lock.svg" onclick="changeLockerPicture('parent_confirm_password')" alt="lockerspicture" />
            </div>
          <span class="frame-14-text d-none" id="pass-match">
            Ups! your password don’t match
          </span>
        </div>
      </div>
    </div>
    <div class="privacy-check-su">
      <div
        for="signUpCheck"
        id="parent_signUpCheck"
        onclick="toogleChecker('privacy')"
      >
        <input id="signUpCheck" type="checkbox" class="checkbox"/>
      </div>
      <span class="privacy-check-su-text">I accept the</span>
      <div class="privacy-check-su-text-underlined">
        <span class="privacy-check-su-text-underlined-text"
          >Privacy policy</span
        >
      </div>
    </div>
  </div>
  <button class="button-wo-icon-su">
    <span class="button-wo-icon-su-text">Sign up</span>
  </button>


`;
}

function renderLoginHTML() {
  return /*html*/ `        <div class="frame-159">
          <div class="text-wrapper">Log in</div>
          <img src="./img/vector-5.svg" alt="blue seperator" />
        </div>
        <!-- WENN REGISTRIERUNG ERFOLGT -->
        <div class="frame-250">
          <div class="form_div">
            <div class="frame-155">
              <label
                id="parent_email"
                class="frame-wrapper"
                for="email"
                aria-selected="false"
              >
                <input
                  type="email"
                  class="frame-14"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  autocomplete="email"
                  required
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
                  oninput="this.setCustomValidity('')"
                />
                <img src="./img/mail.svg" alt="" />
              </label>
            </div>
            <div class="frame-155">
              <label id="parent_login_password" for="login_password" class="frame-wrapper">
                <input
                  type="password"
                  class="frame-14"
                  id="login_password"
                  autocomplete="new-password"
                  placeholder="Password"
                  required
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
                  oninput="this.setCustomValidity('')"
                />
                <img class="img" onclick="changeLockerPicture('parent_login_password')" id="login_password_locker" src="img/lock.svg" alt="lockerspicture" />
              </label>
            </div>
            <div class="text-wrapper-3">This field is required</div>
          </div>
          <div class="frame-6">
            <div class="frame-7">
              <div class="check-button">
                <label for="signUpCheck" id="parent_signUpCheck" onclick="toogleChecker('remember')">
                  <input id="signUpCheck" type="checkbox" class="checkbox">
                </label>
              </div>
              <div class="text-wrapper-4">Remember me</div>
            </div>
          </div>
        </div>
        <div class="frame-176">
          <div class="button-wo-icon" type="submit" onclick="login(event)">
            <button class="button">Log in</button>
          </div>
          <div class="button-seconday-wo">
            <button class="button-2" onclick="guestLogin()">Guest Log in</button>
          </div>
        </div>`;
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


function renderAssigned(i){
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


  function renderFinishCounter(id){
    document.getElementById(`subtask-counter${id}`).innerHTML = 
    `${finishcounter}/${tasks[id]["subtasks"].length} Subtasks`;
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
          <div class="card_div" onclick="editCard(${i})">
            <img src="./img/pen.svg" alt=""/>
            <p>Edit</p>  
          </div>
          <div class="card_div" onclick="deleteTask(${i})">
            <img src="./img/trash.svg" alt=""/>
            <p>Delete</p>  
          </div>
      </div>`;
  
    renderSubtasksInfos(i);
    renderAssigned(i);
  }


  function renderUpdateGreyBadge(assigned,j){
    assigned.innerHTML += `
    <div class="card-board-profile-batch">
    <div class="group-9-board">
        <div id="grey_badge" class="group-9-text" style="background-color: grey;">+${j-3}</div>
        </div>
        </div>`;
  }
  

  function renderUpdateColoredBadges(assigned,colorbg,assign){
    assigned.innerHTML += `
    <div class="card-board-profile-batch">
    <div class="group-9-board">
    <div class="group-9-text" style="background-color: ${colorbg}">${assign}</div>
    </div>
    </div>`;
  }
  
  
  function renderUpdateHTML(task,i){
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
        <div class="card-board-progress-bar-filler" id="progress-bar-${i}"></div>
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
  }

function renderEditCard(content,i){
  content.innerHTML = `
  <div class="edit-card" onclick="dontClose()">
  <form
    id="editTaskForm"
    class="edit-addTask_helper"
    onsubmit="editTasksfromStorage(${tasks[i]['categoryboard']}]); return false;"
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
            <div onclick="renderAssignedTo(), openAssignTo()">
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
              onclick="taskPriorityChoosed('urgent');"
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
              onclick="taskPriorityChoosed('medium');"
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
              onclick="taskPriorityChoosed('low');"
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
            <div onclick="openCategory()">
              <span id="edit-category-border" class="anchor">
                <span id="edit-category-list2">${tasks[i]['category']}</span>
              </span>
            </div>
            <ul class="items">
              <div id="edit-category-list2-items">
                <li onclick="fillInputField('Technical Task')">
                  Technical Task
                </li>
                <li onclick="fillInputField('User Story')">
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
              onclick="changeButtons(event)"
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
                onclick="resetSubtasks()"
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
                onclick="editSubtasks()"
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
        <button class="primary-check-button" type="submit">
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
  
  
  
  

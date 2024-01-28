function renderSummaryHTML() {
  return /*html*/ `
 
  <div class="board_window">
    <div class="frame-40">
        <span>Join 360</span>
        <img src="./img/separation-blue.svg" alt="separation-blue">
        <p>Key Metrics at a Glance</p>
    </div>
    <div class="summary_helper">
    <div class="frame-71">
          <div class="frame-65">
              <div class="pencil-rectangle-button-v1">
                  <div class="frame-59">
                      <img src="./img/stift.svg" alt="stift">
                  </div>
                  <div class="frame-62">
                      <span>1</span>
                      <p>To-do</p>
                  </div>
              </div>
              <div class="cheack-reactangle-button-v1">
                  <div class="frame-59">
                      <img src="./img/hacken.svg" alt="hacken">
                  </div>
                  <div class="frame-60">
                      <span>1</span>
                      <p>Done</p> 
                  </div>
              </div>
          </div>
          <div class="urgency-summary-v1">
              <div class="frame-67">
                  <div class="frame-59">
                      <img class="frame-59-ellipse" src="./img/ellipse-4.svg" alt="ellipse">
                      <img class="frame-59-prio-alta" src="./img/prio-alta.svg" alt="prio-alta">
                  </div>
                  <div class="frame-63">
                      <span>1</span>
                      <p>Urgent</p>
                  </div>
              </div>
              <img class="separation-gray" src="./img/separation-gray.svg" alt="Trennungsstrich">
              <div class="frame-68">
                  <span>October 16, 2022</span>
                  <p>Upcoming Deadline</p>
              </div>
          </div>
          <div class="frame-64">
              <div class="square-button-v1">
                  <div class="frame-61">
                      <span>5</span>
                      <p> Tasks in<br> 
                          Board</p>
                  </div>
              </div>
              <div class="square-button-v1">
                  <div class="frame-61">
                      <span>2</span>
                      <p> Tasks In<br>
                          Progress</p>
                  </div>
              </div>
              <div class="square-button-v1">
                  <div class="frame-61">
                      <span>2</span>
                      <p> Awaiting<br>
                          Feedback</p>
                  </div>
              </div>
          </div>
    </div>
    <div class="frame-69">
        <span class="header-text">Good morning,</span>
        <span class="footer-text">Sofia Müller</span>
    </div>

    </div>  
  </div>`;
}

async function includeHTMLInit(input) {
  let functionName = `render${input}`;
  await includeHTML();

  // Überprüfen, ob die Funktion im globalen Kontext vorhanden ist
  if (typeof window[functionName] === "function") {
    window[functionName]();
  } else {
    console.error(`Die Funktion ${functionName} wurde nicht gefunden.`);
  }
}

function renderAddTaskHTML() {
  return /*html*/ `
    <div class="frame-40">
        <h1>Add Task</h1>
    </div>
    <div class="input-fields">
        <div class="frame-219">
            <div class="title-v1">
                <label for="title">Title<span>*</span></label>
                <div class="frame-203">
                    <div class="frame-14">
                        <input class="input-title" placeholder="Enter a title" type="text" name="title" id="title" required>
                    </div>
                    <!-- des volgende Feld soll nur erscheinen wenn nix im input field steht -->
                    <!-- font famili "Poppins" -->
                    <span class="warning-info-1" style="display: none;">This field is required</span>
                </div>
            </div>
            <div class="description-v1">
                <span>Description</span>
                <div class="frame-207">
                    <div class="frame-17">
                        <textarea class="input-title" placeholder="Enter a Description" type="text" name="description" id="description"></textarea>
                    </div>
                    <!-- des volgende Feld soll nur erscheinen wenn nix im input field steht -->
                    <span class="warning-info-2" style="display: none;">This field is required</span>
                </div>
            </div>
            <div class="asigned-to-v1">
                <span class="assigned-to">Assigned to</span>
                <div class="frame-74">
                    <span class="selcet-contacts">Select contacts to assign</span>
                    <img src="./../img/arrow-drop-downaa.svg" alt="drop-downas">
                </div>
            </div>
        </div>

        <img class="vertical-line" src="./../img/vertical-line.svg" alt="vertical-line">
        
        <div class="frame-39">
            <div class="due-date-v1">
                <label for="title">Due date<span>*</span></label>
                <div class="frame-211">
                    <div class="frame-15">
                        <input class="input-title" placeholder="dd/mm/yyyy" type="number" name="birth-dates" id="birth-dates" required>
                    </div>
                    <!-- des volgende Feld soll nur erscheinen wenn nix im input field steht -->
                    <span class="warning-info-3" style="display: none;">This field is required.</span>
                </div>
            </div>
            <div class="frame-28">
                <label for="title">Prio</label>
                <div class="priority">
                    <div class="frame-16">
                        <span>Urgent</span>
                        <img src="./../img/prio-alta-red.svg" alt="prio-alta-red">
                    </div>
                    <div class="frame-25">
                        <span>Medium</span>
                        <img src="./../img/prio-media.svg" alt="prio-media">
                    </div>
                    <div class="frame-26">
                        <span>Low</span>
                        <img src="./../img/prio-baja.svg" alt="prio-baja">
                    </div>
                </div>
            </div>
            <div class="category">
                <label for="title">Catagory<span>*</span></label>
                <div class="frame-75">
                    <span>Select contacts to assign</span>
                    <img src="./../img/arrow-drop-downaa.svg" alt="drop-downas">
                </div>
            </div>
            <div class="subtask-v1-reconstrution">
                <label for="subtasks">Subtasks</label>
                <div class="frame-18">
                    <input class="subtasks" placeholder="Add new subtask"></input>
                    <img src="./../img/subtasks-icons-11.svg" alt="subtasks-icon">
                </div>
            </div>
        </div>
    </div>
    <p class="disclaimer" for="disclaimer"><span>*</span>This field is required</p>
    <div class="frame-27">
        <button class="secondary">
            <span>Clear</span>
            <img src="./../img/iconoir-cancel.svg" alt="cancel-icon">
        </button>
        <button class="primary-check-button">
            <span>Create Task</span>
            <img src="./../img/check-out-wheite.svg" alt="check-out-wheite">
        </button>
    </div>
  `;
}

function renderBoardHTML() {
  return /*html*/ `
          <div>
          <div class="frame-191">
            <div class="frame-192">
              <h1>Board</h1>
              <div class="frame-123">
                <div class="frame-123-inp">
                  <div class="frame-121">
                    <input type="text" placeholder="Find Task" />
                    <div class="frame-122">
                      <img src="../img/vector-3.svg" class="vector-3-board" />
                      <img src="../img/search.svg" class="search-board" />
                    </div>
                  </div>
                </div>
                <div class="frame-123-btn">
                  <span>Add task</span>
                  <img src="../img/secondary-plus.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="board-dist">
            <div class="frame-136">
              <div class="category-board">
                <span class="board-sections-headline">To do</span>
                <div class="plus-board-container">
                  <img src="../img/plus-board.svg" />
                </div>
              </div>
              <div class="card-board-empty">No tasks To do</div>
            </div>
            <div class="frame-136">
              <div class="category-board">
                <span class="board-sections-headline">In Progress</span>
                <div class="plus-board-container">
                  <img src="../img/plus-board.svg" />
                </div>
              </div>
              <div class="card-board">
                <div class="frame-119">
                  <div class="card-board-user-story">
                    <span class="card-board-user-story-text">User Story</span>
                  </div>
                  <div class="frame-114">
                    <span class="card-board-title">Contact Form & Imprint</span>
                    <span class="card-board-content"
                      >Create a contact form and imprint page...</span
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
                    <div class="frame-217">
                      <div class="card-board-profile-batch">
                        <div class="group-9-board">
                          <img src="../img/ellipse-5.svg" class="ellipse-5" />
                          <div class="group-9-text">AS</div>
                        </div>
                      </div>
                      <div class="card-board-profile-batch">
                        <div class="group-9-board">
                          <img src="../img/ellipse-5.svg" class="ellipse-5" />
                          <div class="group-9-text">AS</div>
                        </div>
                      </div>
                      <div class="card-board-profile-batch">
                        <div class="group-9-board">
                          <img src="../img/ellipse-5.svg" class="ellipse-5" />
                          <div class="group-9-text">AS</div>
                        </div>
                      </div>
                    </div>
                    <div class="card-board-priority">
                      <img
                        src="../img/prio-baja-board.svg"
                        class="card-board-priority-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="frame-136">
              <div class="category-board">
                <span class="board-sections-headline">Await Feedback</span>
                <div class="plus-board-container">
                  <img src="../img/plus-board.svg" />
                </div>
              </div>
              <div class="card-board-empty">No tasks To do</div>
            </div>
            <div class="frame-136">
              <div class="category-board">
                <span class="board-sections-headline">Done</span>
              </div>
              <div class="card-board-empty">No tasks To do</div>
            </div>
          </div>
        </div>
      </div>
      `;
}

function renderContactsHTML() {
  return /*html*/ `<div><div class="frame-97">
          <div class="addContact">
            <div class="primary-contact">
              <div class="text-wrapper">Add new contact</div>
              <img class="person-add" src="img/person_add.svg" />
            </div>
          </div>
            <div class="contact-list">
              <div class="div-wrapper"><div class="div">A</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group"><div class="text-wrapper-2">AM</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Anton Mayer</div>
                  <div class="text-wrapper-3">antom@gmail.com</div>
                </div>
              </div>
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="AM-wrapper"><div class="text-wrapper-2">AS</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Anja Schulz</div>
                  <div class="text-wrapper-3">schulz@hotmail.com</div>
                </div>
              </div>
              <div class="div-wrapper"><div class="div">B</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-2"><div class="text-wrapper-2">BZ</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Benedikt Ziegler</div>
                  <div class="text-wrapper-3">benedikt@gmail.com</div>
                </div>
              </div>
              <div class="div-wrapper"><div class="div">D</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-3"><div class="text-wrapper-2">DE</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">David Eisenberg</div>
                  <div class="text-wrapper-3">davidberg@gmail.com</div>
                </div>
              </div>
              <div class="div-wrapper"><div class="div">E</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-4"><div class="text-wrapper-2">EF</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Eva Fischer</div>
                  <div class="text-wrapper-3">eva@gmail.com</div>
                </div>
              </div>
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-5"><div class="text-wrapper-2">EM</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Emmanuel Mauer</div>
                  <div class="text-wrapper-3">emmanuelma@gmail.com</div>
                </div>
              </div>
              <div class="div-wrapper"><div class="div">M</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-6"><div class="text-wrapper-2">MB</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Marcel Bauer</div>
                  <div class="text-wrapper-3">bauer@gmail.com</div>
                </div>
              </div>
              <div class="div-wrapper"><div class="div">T</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group-7"><div class="text-wrapper-4">TW</div></div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">Tatjana Wolf</div>
                  <div class="text-wrapper-3">wolf@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div class="frame-40">
              <span>Contacts</span>
              <img src="./img/separation-blue.svg" alt="separation-blue">
              <p>Better with a team</p>
          </div>
      </div>`;
}

function renderHelpHTML() {
  return /*html*/ `
    `;
}

function renderPrivacyPolicyHTML() {
  return /*html*/ `<div>Privacy Policy</div>`;
}

function renderLegalNoticeHTML() {
  return /*html*/ `<div>Legal Notice</div>`;
}

function renderSignUpHTML() {
  return /*html*/ `
        <div class="frame-159-su">
          <span class="sign-up-text">Sign up</span>
          <img src="./img/vector-5.svg" alt="" />
        </div>
        <div class="frame-212-su">
          <div class="frame-160-su">
            <div class="frame-155-su">
              <div class="frame-14-su">
                <label
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
              </label>
              </div>
            </div>
            <div class="frame-157-su">
              <div class="frame-14-su">
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
                  oninvalid="this.setCustomValidity('Geben ihre Email Adresse ein!')"
                  oninput="this.setCustomValidity('')"
                />
                <img src="./img/mail.svg" alt="" />
              </label>
              </div>
            </div>
            <div class="frame-158">
              <label id="parent_password" for="password" class="frame-wrapper">
                <input
                  type="password"
                  class="frame-14"
                  id="password"
                  autocomplete="new-password"
                  placeholder="Password"
                  required
                  oninvalid="this.setCustomValidity('Geben sie ihr Passwort ein!')"
                  oninput="this.setCustomValidity('')"
                />
                <img class="img" src="img/lock.svg" alt="locker spicture" />
              </label>
            </div>
            <div class="frame-156-su">
              <div class="frame-14-su" >
                <label id="parent_confirm_password" for="password" class="frame-wrapper">
                <input
                  type="password"
                  class="frame-14"
                  id="confirm_password"
                  autocomplete="new-password"
                  placeholder="Confirm Password"
                  required
                  oninvalid="this.setCustomValidity('Ups! your password don${"`"}t match')"
                  oninput="this.setCustomValidity('')"
                />
                <img class="img" src="img/lock.svg" alt="locker spicture" />
              </label>
                <span class="frame-14-text">
                  Ups! your password don’t match
                </span>
              </div>
            </div>
          </div>
          <div class="privacy-check-su">
          <div class="checkbox" id="signUpCheck" onclick="setChecker('signUp')"></div>
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
        <img src="./img/arrow-left-line.svg" class="arrow-left-line" onclick="renderLogin()">
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
              <label id="parent_password" for="password" class="frame-wrapper">
                <input
                  type="password"
                  class="frame-14"
                  id="password"
                  autocomplete="new-password"
                  placeholder="Password"
                  required
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
                  oninput="this.setCustomValidity('')"
                />
                <img class="img" src="img/lock.svg" alt="locker spicture" />
              </label>
            </div>
            <div class="text-wrapper-3">This field is required</div>
          </div>
          <div class="frame-6">
            <div class="frame-7">
              <div class="check-button">
                <div class="checkbox" id="rememberCheck" onclick="setChecker('remember')"></div>
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
            <button class="button-2">Guest Log in</button>
          </div>
        </div>`;
}

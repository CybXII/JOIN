function renderSummaryHTML() {
  return /*html*/ `
 
  <div class="board_window">
    <div class="frame-71">
    <div class="frame-40">
        <span>Join 360</span>
        <img src="./img/separation-blue.svg" alt="separation-blue">
        <p>Key Metrics at a Glance</p>
    </div>
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
                        <input class="input-title" placeholder="dd/mm/yyyy" type="text" name="birth-dates" id="birth-dates" required>
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
                    <span class="subtasks" placeholder="Add new subtask"></span>
                    <img src="./../img/subtasks-icons-11.svg" alt="subtasks-icon">
                </div>
            </div>
        </div>
    </div>
    <label class="disclaimer" for="disclaimer"><span>*</span>This field is required</label>
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
  return /*html*/ `<div>Board</div>`;
}

function renderContactsHTML() {
  return /*html*/ `<div>Contacts</div>`;
}

function renderHelpHTML() {
  return /*html*/ `
        <div class="help">
          <div class="div">
            <div class="frame"><div class="text-wrapper">Help</div></div>
            <div class="text">
              <p class="p">
                <span class="span">Welcome to the help page for </span>
                <span class="text-wrapper-2">Join</span>
                <span class="span">
                  , your guide to using our kanban project management tool. Here, we'll provide an overview of what
                </span>
                <span class="text-wrapper-2">Join</span>
                <span class="span"> is, how it can benefit you, and how to use it.</span>
              </p>
              <div class="frame-2">
                <div class="text-wrapper-3">What is Join?</div>
                <p class="join-is-a-kanban">
                  <span class="text-wrapper-2">Join</span>
                  <span class="span">
                    is a kanban-based project management tool designed and built by a group of dedicated students as part of
                    their web development bootcamp at the Developer Akademie.<br /><br />Kanban, a Japanese term meaning
                    "billboard", is a highly effective method to visualize work, limit work-in-progress, and
                    maximize efficiency (or flow).
                  </span>
                  <span class="text-wrapper-2">Join</span>
                  <span class="span">
                    leverages the principles of kanban to help users manage their tasks and projects in an intuitive, visual
                    interface.<br /><br />It is important to note that
                  </span>
                  <span class="text-wrapper-2">Join</span>
                  <span class="span">
                    is designed as an educational exercise and is not intended for extensive business usage. While we strive
                    to ensure the best possible user experience, we cannot guarantee consistent availability, reliability,
                    accuracy, or other aspects of quality regarding
                  </span>
                  <span class="text-wrapper-2">Join</span>
                  <span class="span">.</span>
                </p>
              </div>
              <div class="text-wrapper-4">How to use it</div>
              <div class="frame-2">
                <p class="p">
                  <span class="span">Here is a step-by-step guide on how to use </span>
                  <span class="text-wrapper-2">Join</span>
                  <span class="span">:</span>
                </p>
                <div class="frame-2">
                  <div class="frame-300">
                    <div class="text-wrapper-5">1.</div>
                    <p class="div-2">
                      <span class="text-wrapper-6">Exploring the Board<br /></span>
                      <span class="span">When you log in to </span>
                      <span class="text-wrapper-2">Join</span>
                      <span class="span"
                        >, you&#39;ll find a default board. This board represents your project and contains four default
                        lists: &#34;To Do&#34;, &#34;In Progress&#34;, “Await feedback” and &#34;Done&#34;.</span
                      >
                    </p>
                  </div>
                  <div class="frame-300">
                    <div class="text-wrapper-5">2.</div>
                    <p class="div-2">
                      <span class="text-wrapper-6">Creating Contacts<br /></span>
                      <span class="span">In </span>
                      <span class="text-wrapper-2">Join</span>
                      <span class="span"
                        >, you can add contacts to collaborate on your projects. Go to the &#34;Contacts&#34; section, click
                        on &#34;New contact&#34;, and fill in the required information. Once added, these contacts can be
                        assigned tasks and they can interact with the tasks on the board.</span
                      >
                    </p>
                  </div>
                  <div class="frame-300">
                    <div class="text-wrapper-5">3.</div>
                    <p class="div-3">
                      <span class="text-wrapper-7">Adding Cards<br /></span>
                      <span class="text-wrapper-8"
                        >Now that you&#39;ve added your contacts, you can start adding cards. Cards represent individual
                        tasks. Click the &#34;+&#34; button under the appropriate list to create a new card. Fill in the
                        task details in the card, like task name, description, due date, assignees, etc.</span
                      >
                    </p>
                  </div>
                  <div class="frame-300">
                    <div class="text-wrapper-5">4.</div>
                    <p class="div-3">
                      <span class="text-wrapper-7">Moving Cards<br /></span>
                      <span class="text-wrapper-8"
                        >As the task moves from one stage to another, you can reflect that on the board by dragging and
                        dropping the card from one list to another.</span
                      >
                    </p>
                  </div>
                  <div class="frame-300">
                    <div class="text-wrapper-5">5.</div>
                    <p class="div-2">
                      <span class="text-wrapper-6">Deleting Cards<br /></span>
                      <span class="span"
                        >Once a task is completed, you can either move it to the &#34;Done&#34; list or delete it. Deleting
                        a card will permanently remove it from the board. Please exercise caution when deleting cards, as
                        this action is irreversible.<br /><br />Remember that using
                      </span>
                      <span class="text-wrapper-2">Join</span>
                      <span class="span">
                        effectively requires consistent updates from you and your team to ensure the board reflects the
                        current state of your project.<br /><br />Have more questions about
                      </span>
                      <span class="text-wrapper-2">Join</span>
                      <span class="span"
                        >? Feel free to contact us at [Your Contact Email]. We&#39;re here to help you!<br
                      /></span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="text-wrapper-4">Enjoy using Join!</div>
            </div>
          </div>
        </div>
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

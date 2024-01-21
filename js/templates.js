function renderSummaryHTML() {
  return /*html*/ `<div>Summary</div>`;
}

function renderAddTaskHTML() {
  return /*html*/ `<div>Add Task</div>`;
}

function renderBoardHTML() {
  return /*html*/ `<div>Board</div>`;
}

function renderContactsHTML() {
  return /*html*/ `<div>Contacts</div>`;
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
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
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
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
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
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
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
                  oninvalid="this.setCustomValidity('Das ist ein Test')"
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
            <img src="./img/check-button-su.svg" class="privacy-check-su-img" />
            <span class="privacy-check-su-text">I accept the</span>
            <div class="privacy-check-su-text-underlined">
              <span class="privacy-check-su-text-underlined-text"
                >Privacy policy</span
              >
            </div>
          </div>
        </div>
        <button class="button-wo-icon-su" onclick="addUser()">
          <span class="button-wo-icon-su-text" onclick="addUser()">Sign up</span>
        </button>
        <img src="./img/arrow-left-line.svg" class="arrow-left-line" onclick="renderLogin()">
`;
}

function renderLoginHTML(){
  return /*html*/ `        <div class="frame-159">
          <div class="text-wrapper">Log in</div>
          <img src="./img/vector-5.svg" alt="blue seperator" />
        </div>
        <div id="msgBox"></div>
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
                <div class="rectangle"></div>
              </div>
              <div class="text-wrapper-4">Remember me</div>
            </div>
          </div>
        </div>
        <div class="frame-176">
          <div class="button-wo-icon" type="submit" onclick="login(); return false;">
            <button class="button">Log in</button>
          </div>
          <div class="button-seconday-wo">
            <button class="button-2">Guest Log in</button>
          </div>
        </div>`;
}

function renderBodyHTML(){
  return /*html*/ `<div class="frame-3">
      <img src="./../img/capa-2.svg" alt="Logo" class="capa-2" />

      <div class="menu">
        <div id="summary" class="frame-10" onclick="renderSummary()">
          <img src="./../img/summary_icon.svg" alt="Summary" class="icons" />
          <span>Summary</span>
        </div>

        <div id="add_task" class="frame-10" onclick="renderAddTask()">
          <img src="./../img/add_task_icon.svg" alt="Add Task" class="icons" />
          <span>Add Task</span>
        </div>

        <div id="board" class="frame-10" onclick="renderBoard()">
          <img src="./../img/bord_img.svg" alt="Board" class="icons" />
          <span>Board</span>
        </div>

        <div id="contacts" class="frame-10" onclick="renderContacts()">
          <img src="./../img/contacts_img.svg" alt="Contacts" class="icons" />
          <span>Contacts</span>
        </div>
      </div>

      <div class="footer">
        <div id="privacy_policy" class="font" onclick="renderPrivacyPolicy()">
          <span>Privacy Policy</span>
        </div>
        <div id="legal_notice" class="font" onclick="renderLegalNotice()">
          <span>Legal Notice</span>
        </div>
      </div>
    </div>
    <div class="navigation">
      <div class="header">
        <span class="kpmt-header">Kanban Project Management Tool</span>
        <div class="frame-42">
          <img class="help_icon" src="./../img/help.svg" alt="Help Icon" />
          <div class="frame-31">
            <img src="../img/ellipse-3.svg" alt="" class="ellipse-3" />
            <img src="../img/group-9.svg" alt="" class="group-9" />
          </div>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="container" id="content"></div>
    </div>`;
}
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
        <button class="button-wo-icon-su">
          <span class="button-wo-icon-su-text">Sign up</span>
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
          <div class="button-wo-icon" type="submit" onclick="login()">
            <button class="button" ; return false;>Log in</button>
          </div>
          <div class="button-seconday-wo">
            <button class="button-2">Guest Log in</button>
          </div>
        </div>`;
}
/**
 * Renders the HTML for the sign-up form.
 *
 * @return {string} The HTML content for the sign-up form
 */
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
            />
            <img id="password_locker" class="img" src="img/lock.svg" onclick="changeLockerPicture('parent_password')" alt="locker spicture" />
          </div>
        </div>
        <div class="frame-156-su">
          <div class="frame-14-su">
            <div
              id="parent_confirmpassword"
              for="password"
              class="frame-wrapper"
            >
              <input
                type="password"
                class="frame-14"
                id="confirmpassword"
                autocomplete="new-password"
                placeholder="Confirm Password"
              />
              <img id="confirm_locker" class="img" src="img/lock.svg" onclick="changeLockerPicture('parent_confirmpassword')" alt="lockerspicture" />
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
    </button>`;
}

/**
 * Renders the HTML for the login form.
 *
 * @return {string} The HTML for the login form
 */
function renderLoginHTML() {
  return /*html*/ `        <div class="frame-159">
            <div class="text-wrapper">Log in</div>
            <img src="./img/vector-5.svg" alt="blue seperator" />
          </div>
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
                    onkeyup="resetWrongPassword()"
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
                    onkeyup="resetWrongPassword()"
                  />
                  <img class="img" onclick="changeLockerPicture('parent_login_password')" id="login_password_locker" src="img/lock.svg" alt="lockerspicture" />
                </label>
                <div class="text-wrapper-3" id="wrongPassword">Invalid Password or E-Mail</div>
              </div>
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
              <button class="button-2" onclick="guestLogin(event)">Guest Log in</button>
            </div>
          </div>`;
}

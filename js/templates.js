// TODO: NUR DYNAMISCHEN INHALT RENDERN

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
              required
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
        <input id="signUpCheck" type="checkbox" class="checkbox" required />
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
            <button class="button-2">Guest Log in</button>
          </div>
        </div>`;
}

function renderContactInfo(fullname, email, color, initials, phone) {
  return /*html*/ `  
  <div class="frame-105">
    <div class="frame-79">
      <div class="group">
        <div class="circle" style="background-color:${color};"><div class="text-wrapper-circle">${initials}</div></div>
      </div>
    </div>
    <div class="frame-104">
      <div class="frame-81">${fullname}</div>
      <div class="frame-204">
        <div class="frame-108"><img src="./img/pen.svg" alt=""><p>Edit</p></div>
        <div class="delete"><img src="./img/trash.svg" alt=""><p>Delete</p></div>
      </div>
    </div>
  </div>
  <div class="frame-106">
    <span>Contact Information</span>
    <p></p>
  </div>
  <div class="frame-101">
    <div class="frame-102">
      <p class="email">Email</p>
      <a >${email}</a>
    </div>
    <div class="frame-103">
      <p class="Phone">Phone</p>
      <a href="tel:${phone}">${phone}</a>
    </div>
  </div>

`;
}

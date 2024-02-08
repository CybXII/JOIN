let contacts = [
  {
    firstname: "Anton",
    lastname: "Mayer",
    fullname: "Anton Mayer",
    initials: "AM",
    email: "antom@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#F5E227",
  },
  {
    firstname: "Anja",
    lastname: "Schulz",
    fullname: "Anja Schulz",
    initials: "AS",
    email: "schulz@hotmail.com",
    phone: "+49 1111 1111 11",
    color: "#D5C809",
  },
  {
    firstname: "Benedikt",
    lastname: "Ziegler",
    fullname: "Benedikt Ziegler",
    initials: "BZ",
    email: "benedikt@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#61C3DD",
  },
  {
    firstname: "David",
    lastname: "Eisenberg",
    fullname: "David Eisenberg",
    initials: "DE",
    email: "davidberg@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#D8EF5A",
  },
  {
    firstname: "Eva",
    lastname: "Fischer",
    fullname: "Eva Fischer",
    initials: "EF",
    email: "eva@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#0E3E99",
  },
  {
    firstname: "Marcel",
    lastname: "Bauer",
    fullname: "Marcel Bauer",
    initials: "MB",
    email: "bauer@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#2F546E",
  },
  {
    firstname: "Tatjana",
    lastname: "Wolf",
    fullname: "Tatjana Wolf",
    initials: "TW",
    email: "wolf@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#EF1835",
  },
];

let letters = [];

function pushLetters() {
  for (let i = 0; i < contacts.length; i++) {
    const firstLetter = contacts[i]["firstname"].charAt(0);

    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
      renderLetters(firstLetter);
      renderContactCard(firstLetter);
    }
  }
}

function renderLetters(firstLetter) {
  let letterbox = document.getElementById("renderedContent");
  // letterbox.innerHTML = "";

    const letter = firstLetter;
    letterbox.innerHTML += `
    <div class="div-wrapper"><div class="div">${letter}</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div id="contact-card-${letter}"></div>`;
}

function renderContactCard(firstLetter) {
  let content = document.getElementById(`contact-card-${firstLetter}`);

  contacts.forEach((element) => {
      const fullname = element.fullname;
      const email = element.email;
      const color = element.color;
      const initials = element.initials;
    if (element.firstname.charAt(0) == firstLetter) {
      content.innerHTML += renderContactCardHTML(
        fullname,
        email,
        color,
        initials
      );
    }
  });
}

function renderContactCardHTML(fullname, email, color, initials) {
  return /*html*/ `<div class="contact-name">
                <div class="profile-badge">
                  <div class="group">
                    <div class="overlap-group" style="background-color: ${color}">
                      <div class="text-wrapper-2">${initials}</div>
                    </div>
                  </div>
                </div>
                <div class="div-2">
                  <div class="div">${fullname}</div>
                  <div class="text-wrapper-3">${email}</div>
                </div>
              </div>`;
}

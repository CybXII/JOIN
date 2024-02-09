let contacts = [
  {
    firstname: "Anton",
    lastname: "Mayer",
    fullname: "Anton Mayer",
    initials: "AM",
    email: "antom@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#F5E227",
    id: "1",
    taskassigned: false,
  },
  {
    firstname: "Anja",
    lastname: "Schulz",
    fullname: "Anja Schulz",
    initials: "AS",
    email: "schulz@hotmail.com",
    phone: "+49 1111 1111 11",
    color: "#D5C809",
    id: "2",
    taskassigned: false,
  },
  {
    firstname: "Benedikt",
    lastname: "Ziegler",
    fullname: "Benedikt Ziegler",
    initials: "BZ",
    email: "benedikt@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#61C3DD",
    id: "3",
    taskassigned: false,
  },
  {
    firstname: "David",
    lastname: "Eisenberg",
    fullname: "David Eisenberg",
    initials: "DE",
    email: "davidberg@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#D8EF5A",
    id: "4",
    taskassigned: false,
  },
  {
    firstname: "Eva",
    lastname: "Fischer",
    fullname: "Eva Fischer",
    initials: "EF",
    email: "eva@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#0E3E99",
    id: "5",
    taskassigned: false,
  },
  {
    firstname: "Marcel",
    lastname: "Bauer",
    fullname: "Marcel Bauer",
    initials: "MB",
    email: "bauer@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#2F546E",
    id: "6",
    taskassigned: false,
  },
  {
    firstname: "Tatjana",
    lastname: "Wolf",
    fullname: "Tatjana Wolf",
    initials: "TW",
    email: "wolf@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#EF1835",
    id: "7",
    taskassigned: false,
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
  return /*html*/ ``;
}

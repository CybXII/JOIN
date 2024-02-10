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
];

loadContactsFromLocalStorage();

function sortContacts() {
  let sortedContacts = contacts.sort((a, b) => {
    const nameA = a.firstname.toUpperCase();
    const nameB = b.firstname.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

let letters = [];

function pushLetters() {
  let letterbox = document.getElementById("renderedContent");
  letterbox.innerHTML = "";
  sortContacts();
  letters = [];
  for (let i = 0; i < contacts.length; i++) {
    const firstLetter = contacts[i]["firstname"].charAt(0).toUpperCase();
    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
      renderLetters(firstLetter);
      renderContactCard(firstLetter);
    }
  }
}

function renderLetters(firstLetter) {
  let letterbox = document.getElementById("renderedContent");

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
    if (element.firstname.charAt(0).toUpperCase() == firstLetter) {
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

function openContactsContainer() {
  document.getElementById("contacts-background").classList.remove("d-none");
  document.body.classList.add("contacts-background-fixed");
}
function closeContactsContainer() {
  document.getElementById("contacts-background").classList.add("d-none");
  document.body.classList.remove("contacts-background-fixed");
}

function dontClose() {
  event.stopPropagation();
}

function addContactsToStorage() {
  let nameInput = document.getElementById("add_contacts_name").value.split(" ");
  let name = document.getElementById("add_contacts_name");
  let email = document.getElementById("add_contacts_email");
  let phone = document.getElementById("add_contacts_phone");
  let lastName;
  let initials = nameInput[0][0] + nameInput[nameInput.length - 1][0];
  nameInput.length > 1
    ? (lastName = nameInput[nameInput.length - 1])
    : (lastName = "");
  let firstName = nameInput[0];
  let color = getRandomColor();

  let JSONToPush = {
    firstname: firstName,
    lastname: lastName,
    fullname: name.value,
    initials: initials,
    email: email.value,
    phone: phone.value,
    color: color,
    id: contacts.length,
    taskassigned: false,
  };

  contacts.push(JSONToPush);

  name.value = "";
  email.value = "";
  phone.value = "";

  closeContactsContainer();
  saveContactsToLocalStorage();
  pushLetters();
}

function getRandomColor(color) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function saveContactsToLocalStorage() {
  sortContacts();
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
  let storageAsText = localStorage.getItem("contacts");

  if (storageAsText) {
    contacts = JSON.parse(storageAsText);
  }
}

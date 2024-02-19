let letters = [];

let contacts = [
  {
    firstname: "Alexander",
    lastname: "Luft",
    fullname: "Alexander Luft",
    initials: "AL",
    email: "alex@alex.com",
    phone: "+49 1234 5678 90",
    color: "#F5E227",
    id: "1",
    userassigned: "999",
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
    userassigned: "999",
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
    userassigned: "999",
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
    userassigned: "999",
  },
  {
    firstname: "Lukas",
    lastname: "Nolting",
    fullname: "Lukas Nolting",
    initials: "LN",
    email: "lukas@lukas.com",
    phone: "+49 2345 6789 01",
    color: "#2F546E",
    id: "5",
    userassigned: "999",
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
    userassigned: "999",
  },
  {
    firstname: "Steffen",
    lastname: "Schumann",
    fullname: "Steffen Schumann",
    initials: "SS",
    email: "steffen@steffen.com",
    phone: "+49 3456 7890 12",
    color: "#61C3DD",
    id: "7",
    userassigned: "999",
  },
  {
    firstname: "Tatjana",
    lastname: "Wolf",
    fullname: "Tatjana Wolf",
    initials: "TW",
    email: "wolf@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#EF1835",
    id: "8",
    userassigned: "999",
  },
  {
    firstname: "Eva",
    lastname: "Fischer",
    fullname: "Eva Fischer",
    initials: "EF",
    email: "eva@gmail.com",
    phone: "+49 1111 1111 11",
    color: "#0E3E99",
    id: "9",
    userassigned: "999",
  },
];

loadContactsFromLocalStorage();

function renderContacts() {
  loadUsersFromLocalStorage();
  classesContacts();
  addContactListeners();
}

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
    const phone = element.phone;
    const userid = element.id;
    if (element.firstname.charAt(0).toUpperCase() == firstLetter) {
      content.innerHTML += renderContactCardHTML(
        fullname,
        email,
        color,
        initials,
        phone,
        userid
      );
    }
  });
}

function renderContactCardHTML(
  fullname,
  email,
  color,
  initials,
  phone,
  userid
) {
  return /*html*/ `<div class="contact-name" onclick="openContact('${fullname}', '${email}', '${color}', '${initials}', '${phone}', '${userid}')">
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

function formatPhoneNumber() {
  let phoneNumber = document.getElementById("add_contacts_phone").value;
  phoneNumber = phoneNumber.replace(/\D/g, "");

  if (phoneNumber.length === 10) {
    phoneNumber = "49" + phoneNumber;
  } else if (phoneNumber.length === 11 && phoneNumber.startsWith("0")) {
    phoneNumber = "49" + phoneNumber.slice(1);
  } else if (phoneNumber.length === 12 && phoneNumber.startsWith("0")) {
    phoneNumber = "49" + phoneNumber.slice(1);
  }

  phoneNumber = phoneNumber.replace(
    /(\d{2})(\d{4})(\d{4})(\d{2})/,
    "+$1 $2 $3 $4"
  );
  return phoneNumber;
}

function contactAnimation() {
  let element = document.getElementById("contact_info");
  element.classList.add("contact-info-content");
}

function deleteContact(userid) {
  const updatedContacts = contacts.filter((contact) => contact.id !== userid);
  contacts.splice(0, contacts.length);
  contacts.push(...updatedContacts);
  pushLetters();
  saveContactsToLocalStorage();
  document.getElementById("contact_info").innerHTML = "";
  addContactListeners();
}

function editContact(userid) {
  console.log(userid + " wird gerade editiert!");
}

function addContactsToStorage() {
  let nameInput = document.getElementById("add_contacts_name").value.split(" ");
  let name = document.getElementById("add_contacts_name");
  let email = document.getElementById("add_contacts_email");
  let phone = formatPhoneNumber();

  let lastName;
  let initials =
    nameInput[0][0].toUpperCase() +
    nameInput[nameInput.length - 1][0].toUpperCase();
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
    phone: phone,
    color: color,
    id: `${contacts.length}`,
    taskassigned: false,
    contactAssignedTo: users[0].id,
  };

  contacts.push(JSONToPush);

  name.value = "";
  email.value = "";
  phone.value = "";

  closeContactsContainer();
  saveContactsToLocalStorage();
  setTimeout(() => {
    pushLetters();
  }, 1);
  addContactListeners();
}

function openContact(fullname, email, color, initials, phone, userid) {
  let element = document.getElementById("contact_info");
  element.classList.remove("contact-info-content");
  element.classList.remove("contact-info");
  document.getElementById("contact_info").innerHTML = renderContactInfo(
    fullname,
    email,
    color,
    initials,
    phone,
    userid
  );
}

function renderContactInfo(fullname, email, color, initials, phone, userid) {
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
        <div class="frame-108" onclick="editContact('${userid}')"><img src="./img/pen.svg" alt=""><p>Edit</p></div>
        <div class="delete" onclick="deleteContact('${userid}')"><img src="./img/trash.svg" alt=""><p>Delete</p></div>
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

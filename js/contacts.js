let letters = [];

let contacts = [];
let currentcontact = [];

let nameInput;
let contactName;
let email;
let phone;
let lastName;
let initials;
let firstName;
let color;

loadUsersFromLocalStorage();


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




function closeContactsContainer() {
  document.getElementById("contacts-background").classList.add("d-none");
  document.body.classList.remove("contacts-background-fixed");
}


function closeContactsContainerAdd() {
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
  phoneNumber = phoneNumber.replace(/(\d{2})(\d{4})(\d{4})(\d{2})/,"+$1 $2 $3 $4");
  return phoneNumber;
}


function contactAnimation() {
  let element = document.getElementById("contact_info");
  element.classList.add("contact-info-content");
}


async function deleteContact(userid) {
  const indexToDelete = contacts.findIndex(contact => contact.id === userid);
  if (indexToDelete !== -1) {
    contacts.splice(indexToDelete, 1);
    await setItem("contacts", JSON.stringify(contacts));
    renderContacts();
    document.getElementById("contact_info").innerHTML = "";
    addContactListeners();
  }
}


function editContact(userid, i) {
  openContactsContainer(userid, i);
  renderEditContact(userid, i);
  let color = currentcontact.color;
  document.getElementById("initialsUserEdit").innerHTML =
    currentcontact.initials;
  document.getElementById(
    "initialsUserEdit"
  ).style = `background-color: ${color}`;
  document.getElementById("edit_contacts_name").value = currentcontact.fullname;
  document.getElementById("edit_contacts_email").value = currentcontact.email;
  document.getElementById("edit_contacts_phone").value = currentcontact.phone;
}


async function addEditContact(i) {
  let newfull = currentcontact.fullname = document.getElementById("edit_contacts_name").value;
  let newEmail = currentcontact.email = document.getElementById("edit_contacts_email").value;
  let newPhone = currentcontact.phone = document.getElementById("edit_contacts_phone").value;
  let newcolor = currentcontact.color;
  let newinitials = currentcontact.initials;
  contacts[i] = currentcontact;
  await setItem("contacts", JSON.stringify(contacts));
  closeContactsContainer();
  renderContacts();
  openContact(
newfull,newEmail,newcolor,newinitials,newPhone,currentcontact.userid,i
);
  contactAnimation();
}


function addContactsToStorage() {
  nameInput = document.getElementById("add_contacts_name").value.split(" ");
  contactName = document.getElementById("add_contacts_name");
  email = document.getElementById("add_contacts_email");
  phone = formatPhoneNumber();
  lastName;
  initials =
    nameInput[0][0].toUpperCase() +
    nameInput[nameInput.length - 1][0].toUpperCase();
  nameInput.length > 1
    ? (lastName = nameInput[nameInput.length - 1])
    : (lastName = "");
  firstName = nameInput[0];
  color = getRandomColor();
  addNewContact();
}


async function addNewContact(){
  pushContacts();
  closeContactsContainer();
  await setItem("contacts", JSON.stringify(contacts));
  pushLetters();
  addContactListeners();
}


function pushContacts(){
  let JSONToPush = {
    firstname: firstName,
    lastname: lastName,
    fullname: contactName.value,
    initials: initials,
    email: email.value,
    phone: phone,
    color: color,
    id: `${contacts.length}`,
    taskassigned: false,
    contactAssignedTo: users[0].id
  };
  contacts.push(JSONToPush);
  contactName.value = "";
  email.value = "";
  phone.value = "";
}


function openContact(fullname, email, color, initials, phone, userid, i) {
  currentcontact = contacts[i];
  let element = document.getElementById("contact_info");
  element.classList.remove("contact-info-content");
  element.classList.remove("contact-info");
  document.getElementById("contact_info").innerHTML = 
  renderContactInfo(fullname,email,color,initials,phone,userid,i);
  openRespContactContainer();
  document.getElementById("contact_info_resp").innerHTML = 
  renderContactInfo(fullname,email,color,initials,phone,userid,i);
}


function openRespContactContainer() {
  document
    .getElementById("contact_info_resp_background")
    .classList.remove("d-none");
}


function closeRespContactContainer() {
  document
    .getElementById("contact_info_resp_background")
    .classList.add("d-none");
}


async function renderContacts() {
  await loadContacts();
  classesContacts();
  pushLetters();
  addContactListeners();
}


function renderLetters(firstLetter) {
  let letterbox = document.getElementById("renderedContent");
  const letter = firstLetter;
  letterbox.innerHTML += `
    <div class="div-wrapper"><div class="div">${letter}</div></div>
              <img class="img" src="img/seperator_contacts.svg" />
              <div id="contact-card-${letter}"></div>`;
}


function renderContactCard(firstLetter, i) {
  let content = document.getElementById(`contact-card-${firstLetter}`);
  contacts.forEach((element, i) => {
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
        userid,
        i
      );
    }
  });
}


function renderContactCardHTML(fullname,email,color,initials,phone,userid,i) {
  return /*html*/ `
                <div class="responsiv_Overlay" onclick="openRespContactContainer()"></div>  
                <div class="contact-name" onclick="openContact('${fullname}', '${email}', '${color}', '${initials}', '${phone}', '${userid}', '${i}')">
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
  document.getElementById("left-side").innerHTML = `
    <div class="testContainer">
      <img class="joinLogo" src="./img/capa-2.svg" alt="Join-Logo">
      <h1>Edit contact</h1>
      <img class="underlineBlue" src="./img/vector-5.svg" alt="underline-blue">
    </div>`;
  document.getElementById("right-side").innerHTML = `
  <div class="FNandSN" id="initialsUserEdit"></div>
  <div class="closeImg" onclick="closeContactsContainer()"></div>
  <div id="editContactCard"></div>`;
}

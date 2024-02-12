let pass_visible=false;
let confirmPass_visible=false;
let loginPass_visible=false;

function initializeLoginListeners() {
  // Finde die Input-Elemente
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("login_password");
  // Füge Event Listener für das Fokusevent hinzu
  [emailInput, passwordInput].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}

function setFocusListener(inputElement){
  inputElement.addEventListener("focus", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");
  
    // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
    if (parentWrapper) {
      let parentWrapperId = parentWrapper.id;

      if (parentWrapperId === 'parent_password' || parentWrapperId === 'parent_confirm_password'||parentWrapperId==='parent_login_password'){
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");
        changeLocker(parentWrapperId);
      } 
      else{
        parentWrapper.classList.add("aktive");
        parentWrapper.classList.remove("invalid");  
      }
    }
  });
}

function setBlurListener(inputElement){
  inputElement.addEventListener("blur", function () {
    let parentWrapper = inputElement.closest(".frame-wrapper");

    // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
    if (parentWrapper) {
      let parentWrapperId = parentWrapper.id;

      if (parentWrapperId === 'parent_password' || parentWrapperId === 'parent_confirm_password'||parentWrapperId==='parent_login_password'){
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
        changeLockerPictureBack(parentWrapperId);
      } 
      else{
        parentWrapper.classList.remove("aktive");
        parentWrapper.classList.remove("invalid");
        }
    }
  });
}

function initializeSignUPListeners() {
  document.addEventListener("DOMContentLoaded", function () {
    // Initialisiere die Event Listener
  });
  // Finde die Input-Elemente
  let nameInput = document.getElementById("name");
  let emailInput = document.getElementById("email");
  let passwordInput = document.getElementById("password-su");
  let confirm_password = document.getElementById("confirm_password");

  // Füge Event Listener für das Fokusevent hinzu
  [ emailInput, 
    passwordInput, 
    nameInput, 
    confirm_password
  ].forEach(function (inputElement) {
    setFocusListener(inputElement);
    setBlurListener(inputElement);
  });
}

function changeLocker(input){
  if (input === 'parent_confirm_password'){
    if(confirmPass_visible===false){
      document.getElementById(`confirm_password`).setAttribute('type','password');
      document.getElementById('confirm_locker').setAttribute('src', 'img/visibility_off.svg');  
    } else{
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById('confirm_locker').setAttribute('src', 'img/visibility.svg');  
    }
  }
  else if(input === 'parent_password'){
    if(pass_visible===false){
      document.getElementById(`password-su`).setAttribute('type','password');
      document.getElementById('password_locker').setAttribute('src', 'img/visibility_off.svg');  
    } else{
      document.getElementById(`password-su`).setAttribute('type','text');
      document.getElementById('password_locker').setAttribute('src', 'img/visibility.svg');  
    }
  }
  else if(input === 'parent_login_password'){
    if(loginPass_visible===false){
      document.getElementById(`login_password`).setAttribute('type','password');
      document.getElementById('login_password_locker').setAttribute('src', 'img/visibility_off.svg');  
    } else{
      document.getElementById(`login_password`).setAttribute('type','text');
      document.getElementById('login_password_locker').setAttribute('src', 'img/visibility.svg');  
    }
  }
}

function changeLockerPictureBack(parentWrapperId){
  if(parentWrapperId==='parent_login_password'){
    if(loginPass_visible===false){
      document.getElementById(`login_password`).setAttribute('type','password');
      document.getElementById('login_password_locker').setAttribute('src', 'img/lock.svg');  
    } else {
      document.getElementById(`login_password`).setAttribute('type','text');
      document.getElementById('login_password_locker').setAttribute('src', 'img/visibility.svg');  
    }
  } else {
    if(confirmPass_visible===false){
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById('confirm_locker').setAttribute('src', 'img/lock.svg');  
    } else {
      document.getElementById(`confirm_password`).setAttribute('type','text');
      document.getElementById('confirm_locker').setAttribute('src', 'img/visibility.svg');  
    }
    if(pass_visible===false){
      document.getElementById(`password-su`).setAttribute('type','password');
      document.getElementById('password_locker').setAttribute('src', 'img/lock.svg');  
    } else {
      document.getElementById(`password-su`).setAttribute('type','text');
      document.getElementById('password_locker').setAttribute('src', 'img/visibility.svg');  
    }
  }
}

function changeLockerPicture(input){
  if (input==='parent_confirm_password') {
    confirmPass_visible=!confirmPass_visible;
    if (confirmPass_visible === false) { 
      changeLockerPictureBack(input)   
    }else{
      changeLocker(input);
    }
  }else if((input==='parent_password')){
    pass_visible=!pass_visible;
    if (pass_visible === false) { 
      changeLockerPictureBack(input)   
    }else{
      changeLocker(input);
    }
  }
  else if((input==='parent_login_password')){
    loginPass_visible=!loginPass_visible;
    if (loginPass_visible === false) { 
      changeLockerPictureBack(input)   
    }else{
      changeLocker(input);
    }
  }
}

// function addContactListeners() {
//   var contactList = document.getElementById('renderedContent');
//   var contactNames = contactList.querySelectorAll('.contact-name');

//   contactNames.forEach(function (contact) {
//     contact.addEventListener('click', function () {
//       // Entfernen Sie die 'active_contact'-Klasse von allen Elementen
//       contactNames.forEach(function (c) {
//         c.classList.remove('active_contact');
//         c.classList.add('contact-name');

//       });

//       // Fügen Sie dann die 'active_contact'-Klasse nur zum angeklickten Element hinzu
//       contact.classList.add('active_contact');
//       contact.classList.remove('contact-name');
//       // Zeigen Sie den Inhalt von .div2 .div an
//       var nameContainer = contact.querySelector('.div-2 .div');
//       var contactName = nameContainer.textContent.trim();
//       console.log("Kontaktname:", contactName);
//       openContact(contactName);
//     });
//   });
// }

function addContactListeners() {
  var contactList = document.getElementById('renderedContent');
  var contactNames = contactList.querySelectorAll('.contact-name');

  contactNames.forEach(function(contact) {
    contact.addEventListener('click', function() {
      // Entfernen der 'active'-Klasse von allen Elementen
      contactNames.forEach(function(c) {
        c.classList.remove('active_contact');
        c.classList.add('contact-name');
      });

      // Hinzufügen der 'active_contact'-Klasse zum angeklickten Elemnt
      contact.classList.add('active_contact');
      contact.classList.remove('contact-name');

      // Zeigen Sie den Inhalt von .div2 .div an
      var nameContainer = contact.querySelector('.div-2 .div');
      var contactName = nameContainer.textContent.trim();
      console.log("Kontaktname:", contactName);
      // openContact(contactName);
      setTimeout(() => {
        contactAnimation();
        
      }, 1);

      contact.id = 'active-contact';
      

      // Animation für .contact_info auslösen
      // let contactInfo = document.querySelector('.contact_info'); // Sttelt sicher, dass die Klasse koreckt ist
      // if (contactInfo) {
      //   contactInfo.classList.toggle('show');
      // }
    });
  });
}

// function listenerContacts(){

// document.addEventListener('DOMContentLoaded', function() {
//   let idContact = document.getElementById('active-contact');

//   id_frame_40.addEventListener('click', function() {
//     let contactInfo = document.querySelector('.contact_info');
//     contactInfo.classList.toggle('show');
//   });
// });
// }

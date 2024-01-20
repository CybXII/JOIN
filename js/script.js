document.addEventListener('DOMContentLoaded', function () {
  const email_div = document.getElementById("parent_email");
  const email_input = document.getElementById("email");
  const password_div = document.getElementById("parent_password");
  const password_input = document.getElementById("password");

email_input.addEventListener('blur', function () {
  // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
  email_div.classList.remove('aktive');
});

email_input.addEventListener('focus', function () {
  // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
  email_div.classList.add('aktive');
});

password_input.addEventListener('blur', function () {
  // Entferne die Klasse, wenn das Inputfeld den Fokus verliert
  password_div.classList.remove('aktive');
});

password_input.addEventListener('focus', function () {
  // Füge die Klasse hinzu, wenn das Inputfeld den Fokus hat
  password_div.classList.add('aktive');
});
});


// function setListener(){
//   email_input.addEventListener("click", () => {
//     email_div.classList.toggle("aktive");
//     password_div.classList.toggle("aktive");
//   });
//   password_input.addEventListener("in", () => {
//     password_div.classList.toggle("aktive");
//     email_div.classList.toggle("aktive");
//   });
// }




function move (){
  document.getElementById('logo_container').classList.remove("big_size");
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

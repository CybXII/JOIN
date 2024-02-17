function getRandomColor(color) {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderPrivacyPolicy() {
  classesPrivacyPolicy();
}

function renderHelp() {
  classesHelp();
}

function renderLegalNotice() {
  classesLegalNotice();
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

function openLogOutBox() {
  let logoutBox = document.getElementById("LogOutBoxCSS");
  if (!logoutBox.classList.contains("d-none")) {
    logoutBox.classList.add("d-none");
  } else {
    logoutBox.classList.remove("d-none");
    window.addEventListener("click", function (e) {
      if (document.getElementById("openLogOutBox").contains(e.target)) {
      } else {
        document.getElementById("LogOutBoxCSS").classList.add("d-none");
      }
    });
  }
}

function dontClose() {
  event.stopPropagation();
}

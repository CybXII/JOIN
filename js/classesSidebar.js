/**
 * Function to update classes for legal notice display.
 */
function removeActiveClass() {
  document.getElementById("privacy_policy").classList.remove("font-active");
  document.getElementById("legal_notice").classList.remove("font-active");
  document.getElementById("summary").classList.remove("frame-10-active");
  document.getElementById("add_task").classList.remove("frame-10-active");
  document.getElementById("board").classList.remove("frame-10-active");
  document.getElementById("contacts").classList.remove("frame-10-active");
  document.getElementById("summary").classList.add("frame-10");
  document.getElementById("add_task").classList.add("frame-10");
  document.getElementById("board").classList.add("frame-10");
  document.getElementById("contacts").classList.add("frame-10");
  document.getElementById("privacy_policy").classList.add("font");
  document.getElementById("legal_notice").classList.add("font");
}


function setActivClass(inputID){
  if(inputID === "legal_notice"||inputID === "privacy_policy"){
    document.getElementById(inputID).classList.remove("font");
    document.getElementById(inputID).classList.add("font-active");  
  }else{
    document.getElementById(inputID).classList.remove("frame-10");
    document.getElementById(inputID).classList.add("frame-10-active");  
  }
}




// Orientations Sensoren auslesen
function orientationAuslesen(ereignis: DeviceOrientationEvent): void {
  const winkelAlpha: number = Math.round(ereignis.alpha! * 1000) / 1000;
  const winkelBeta: number = Math.round(ereignis.beta! * 1000) / 1000;
  const winkelGamma: number = Math.round(ereignis.gamma! * 1000) / 1000;

  document.getElementById("datenAlpha")!.innerHTML = winkelAlpha.toString();
  document.getElementById("datenBeta")!.innerHTML = winkelBeta.toString();
  document.getElementById("datenGamma")!.innerHTML = winkelGamma.toString();
  document.getElementById("kompass")!.style.transform =
    "rotate(" + winkelAlpha + "deg)";
}
// bewegungs-Sensoren auslesen
function bewegungAuslesen(ereignis: DeviceMotionEvent): void {
  const beschleunigungX: number =
    Math.round(ereignis.accelerationIncludingGravity!.x! * 1000) / 1000;
  const beschleunigungY: number =
    Math.round(ereignis.accelerationIncludingGravity!.y! * 1000) / 1000;
  const beschleunigungZ: number =
    Math.round(ereignis.accelerationIncludingGravity!.z! * 1000) / 1000;

  document.getElementById("accelX")!.innerHTML = beschleunigungX!.toString();
  document.getElementById("accelY")!.innerHTML = beschleunigungY!.toString();
  document.getElementById("accelZ")!.innerHTML = beschleunigungZ!.toString();
}

// aufruf der Methode für Auslesung der Sensoren
window.onload = function () {
  window.addEventListener("deviceorientation", orientationAuslesen, false);
  window.addEventListener("devicemotion", bewegungAuslesen, false);
  // window.addEventListener("devicemotion", jump, false);
  window.addEventListener("keypress", jumpSpace);
};

//* Sensor Dino Game :)

let character = document.getElementById("character");
let block = document.getElementById("block");

/* function jump(ereignis: DeviceMotionEvent): void {
  // lesen von z-Beschleunigung
  const beschleunigungZ: number = ereignis.accelerationIncludingGravity!.z!;
  // falls z-B größer 12 so wird ein Sprung aktiviert => return true
  if (beschleunigungZ > 12) {
    character?.classList.add("animate");
    console.log("jump");
  } else {
    document.getElementById("jump")!.innerHTML = "&#x1F7E2";
  }
} */

function jumpSpace(key: any) {
  if ((key = "Space")) {
    if (character?.classList.contains("animate") == false) {
      character!.classList.add("animate");
      setTimeout(function () {
        character!.classList.remove("animate");
      }, 550);
      console.log(character?.classList);
    }
    if (isDead == true) {
      window.location.reload();
    }
  }
}

let isDead: boolean = false;

let checkDead = setInterval(function () {
  let characterTop = parseInt(
    window.getComputedStyle(character as Element).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block as Element).getPropertyValue("left")
  );
  if (blockLeft > 40 && blockLeft < 60 && characterTop >= 130) {
    isDead = true;
    block?.setAttribute("style", "animation: none");
    block?.setAttribute("style", "display: none");
    document.getElementById("lose")!.innerHTML = "YOU LOSE :(";
  }
}, 10);

// import { throttle } from "throttle-typescript";

//* Sensoren Daten

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
  // eventlistener für Ausrichtung des Geräts
  window.addEventListener("deviceorientation", orientationAuslesen, false);
  // eventlistener für Bewgung
  window.addEventListener("devicemotion", bewegungAuslesen, false);
  // eventlistener für Tasteninput
  window.addEventListener("keypress", jumpSpace);
};

async function requestDeviceOrientation() {
  if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
    // Handle iOS 13+ devices.
    (DeviceMotionEvent as any)
      .requestPermission()
      .then((state: any) => {
        if (state === "granted") {
          window.addEventListener("devicemotion", jump);
        } else {
          console.error("Request to access the orientation was rejected");
        }
      })
      .catch(console.error);
  } else {
    // Handle regular non iOS 13+ devices.
    window.addEventListener("devicemotion", jump);
  }
}

//* Sensor Dino Game :)

let character = document.getElementById("character");
let block = document.getElementById("block");
let isDead: boolean = false;
let score: number;

const startButton: HTMLButtonElement = document.getElementById(
  "start"
) as HTMLButtonElement;
startButton.addEventListener("click", () => {
  startGame();
  requestDeviceOrientation();
  console.log("button clicked");
});

function setScore(points: number) {
  score = points;
  document.getElementById("score")!.innerHTML = points.toString();
}

function startGame() {
  block?.classList.add("animateBlock");
  block?.setAttribute("style", "display:block");
  isDead = false;
  setScore(0);
  document.getElementById("lose")!.innerHTML = "";
  document.getElementById("start")!.innerHTML = "Restart";
  console.log("start");
}

function jump(ereignis: DeviceMotionEvent): void {
  // lesen von z-Beschleunigung
  const beschleunigungZ: number = ereignis.accelerationIncludingGravity!.z!;
  // falls z-B größer 12 wird ein Sprung aktiviert
  if (beschleunigungZ > 12) {
    if (character?.classList.contains("animateCharacter") == false) {
      character!.classList.add("animateCharacter");
      setTimeout(function () {
        character!.classList.remove("animateCharacter");
      }, 550);
    }
    if (isDead == true) {
      startGame();
      console.log("dead2");
    }
  }
}

function jumpSpace(key: any) {
  if ((key = "w")) {
    if (character?.classList.contains("animateCharacter") == false) {
      character!.classList.add("animateCharacter");
      setTimeout(function () {
        character!.classList.remove("animateCharacter");
      }, 550);
      console.log(key);
    }
    if (isDead == true) {
      startGame();
      console.log("dead");
    }
  }
}

setInterval(function checkDead() {
  let characterTop = parseInt(
    window.getComputedStyle(character as Element).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block as Element).getPropertyValue("left")
  );
  if (blockLeft > 40 && blockLeft < 60 && characterTop >= 130) {
    isDead = true;
    block!.classList.remove("animateBlock");
    block?.setAttribute("style", "display: none");
    document.getElementById("lose")!.innerHTML = "YOU LOSE :(";
  } else if (blockLeft > 40 && blockLeft < 60 && characterTop <= 130) {
    setScore(score + 1);
  }
}, 10);

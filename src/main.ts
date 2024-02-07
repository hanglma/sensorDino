// import "./style.css";
// import typescriptLogo from "./pictures/typescript.svg";
// import viteLogo from "./pictures/vite.svg";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `;

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

window.onload = function () {
  window.addEventListener("deviceorientation", orientationAuslesen, false);
  window.addEventListener("devicemotion", bewegungAuslesen, false);
  window.addEventListener("devicemotion", sprungDetection, false);
};

function sprungDetection(ereignis: DeviceMotionEvent): boolean {
  // lesen von z-Beschleunigung
  const beschleunigungZ: number = ereignis.accelerationIncludingGravity!.z!;
  // falls z-B größer 12 so wird ein Sprung aktiviert => return true
  if (beschleunigungZ > 12) {
    document.getElementById("jump")!.innerHTML = "&#x1F534";
    return true;
  } else {
    document.getElementById("jump")!.innerHTML = "&#x1F7E2";
    return false;
  }
}

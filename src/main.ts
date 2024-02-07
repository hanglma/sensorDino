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

function orientationAuslesen(ereignis: any): void {
  let winkelAlpha: number = Math.round(ereignis.alpha * 100) / 100;
  let winkelBeta: number = Math.round(ereignis.beta * 100) / 100;
  let winkelGamma: number = Math.round(ereignis.gamma * 100) / 100;

  document.getElementById("datenAlpha")!.innerHTML = winkelAlpha.toString();
  document.getElementById("datenBeta")!.innerHTML = winkelBeta.toString();
  document.getElementById("datenGamma")!.innerHTML = winkelGamma.toString();
  document.getElementById("kompass")!.style.transform =
    "rotate(" + winkelAlpha + "deg)";
}

function bewegungAuslesen(ereignis: any): void {
  const beschleunigungX = ereignis.accelerationIncludingGravity.x;
  const beschleunigungY = ereignis.accelerationIncludingGravity.y;
  const beschleunigungZ = ereignis.accelerationIncludingGravity.z;

  document.getElementById("accelX")!.innerHTML = beschleunigungX.toString();
  document.getElementById("accelY")!.innerHTML = beschleunigungY.toString();
  document.getElementById("accelZ")!.innerHTML = beschleunigungZ.toString();
}

window.onload = function () {
  window.addEventListener("deviceorientation", orientationAuslesen, false);
  window.addEventListener("devicemotion", bewegungAuslesen, false);
};

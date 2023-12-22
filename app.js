const scratchCard = document.getElementById("scratchCard");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const instructionText = document.querySelector(".instruction");

const image = new Image();

image.src = "scratch.avif";

canvas.width = window.innerWidth; // Utiliser window.innerWidth pour la largeur
canvas.height = window.innerHeight; // Utiliser window.innerHeight pour la hauteur
scratchCard.appendChild(canvas);

ctx.fillStyle = "#888";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = "destination-out";

let isDrawing = false;

function startDrawing(e) {
  isDrawing = true;
  scratch(e);
}

function stopDrawing() {
  isDrawing = false;
}

function scratch(e) {
  if (!isDrawing) return;
  const { clientX, clientY } = e.touches ? e.touches[0] : e; // Prendre en compte les événements tactiles
  const { left, top } = canvas.getBoundingClientRect();
  const offsetX = clientX - left;
  const offsetY = clientY - top;
  ctx.beginPath();
  ctx.arc(offsetX, offsetY, 20, 0, Math.PI * 2);
  ctx.fill();
  instructionText.style.opacity = 0;
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("mousemove", scratch);
canvas.addEventListener("touchmove", scratch);

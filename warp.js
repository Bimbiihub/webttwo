const canvas = document.getElementById("warpCanvas");
const ctx = canvas.getContext("2d");
const counter1 = document.getElementById("counter1");
const counter2 = document.getElementById("counter2");
const counter3 = document.getElementById("counter3");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let particles = [];
let animationId;
let isWarping = false;
let currentCount1 = 0;
let currentCount2 = 0;
let currentCount3 = 0;
let targetCount1 = 2000000;
let targetCount2 = 500000;
let targetCount3 = 15;

// Set canvas size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle class
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.width;
    this.speed = 0;
  }

  update() {
    this.z -= this.speed;
    this.speed += 0.5;

    if (this.z <= 0) {
      this.reset();
    }
  }

  draw() {
    const x = (this.x - canvas.width / 2) * (canvas.width / this.z);
    const y = (this.y - canvas.height / 2) * (canvas.width / this.z);
    const screenX = x + canvas.width / 2;
    const screenY = y + canvas.height / 2;

    const size = (1 - this.z / canvas.width) * 3;
    const opacity = 1 - this.z / canvas.width;

    const px =
      (this.x - canvas.width / 2) * (canvas.width / (this.z + this.speed * 5));
    const py =
      (this.y - canvas.height / 2) * (canvas.width / (this.z + this.speed * 5));
    const prevX = px + canvas.width / 2;
    const prevY = py + canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(screenX, screenY);
    ctx.lineTo(prevX, prevY);
    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`; // Electric blue streak
    ctx.lineWidth = size;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(screenX, screenY, size / 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(200, 200, 255, ${opacity})`; // Bright blue-white core
    ctx.fill();
  }
}

// Create particles
function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

// Animation loop
function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  animationId = requestAnimationFrame(animate);
}

// Counter animation
function startCounter() {
  if (isWarping) return;

  isWarping = true;
  counter1.classList.add("warping");
  counter2.classList.add("warping");
  counter3.classList.add("warping");
  startBtn.disabled = true;
  currentCount = 0;

  createParticles(300);
  animate();

  const duration = 3000; // 3 seconds
  const startTime = Date.now();
  const startCount = 0;

  function updateCounter() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for acceleration
    const easeProgress =
      progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    currentCount1 = Math.floor(startCount + targetCount1 * easeProgress);
    currentCount2 = Math.floor(startCount + targetCount2 * easeProgress);
    currentCount3 = Math.floor(startCount + targetCount3 * easeProgress);
    counter1.textContent = currentCount1;
    counter2.textContent = currentCount2;
    counter3.textContent = currentCount3;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter1.textContent = targetCount1;
      counter2.textContent = targetCount2;
      counter3.textContent = targetCount3;
      setTimeout(stopWarp, 500);
    }
  }

  updateCounter();
}

function stopWarp() {
  isWarping = false;
  counter1.classList.remove("warping");
  counter2.classList.remove("warping");
  counter3.classList.remove("warping");
  startBtn.disabled = false;
  particles.forEach((p) => (p.speed = 0));

  setTimeout(() => {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = [];
  }, 1000);
}

function reset() {
  cancelAnimationFrame(animationId);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = [];
  currentCount = 0;
  counter1.textContent = "0";
  counter2.textContent = "0";
  counter3.textContent = "0";
  counter1.classList.remove("warping");
  counter2.classList.remove("warping");
  counter3.classList.remove("warping");
  isWarping = false;
  startBtn.disabled = false;
}

startBtn.addEventListener("click", startCounter);
resetBtn.addEventListener("click", reset);

// Initial state
ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

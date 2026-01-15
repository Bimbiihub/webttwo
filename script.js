// Filter Buttons Logic
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    // Optional: Fix layout bugs (force grid reflow)
    const grid = document.querySelector(".card-grid");
    grid.style.display = "none";
    void grid.offsetHeight;
    grid.style.display = "";
  });
});

// Expand Video Section
function toggleVideo(button) {
  const videoContainer = button.nextElementSibling;
  videoContainer.classList.toggle("expanded");
}

// Fast Count Effect
// const counters = document.querySelectorAll(".stat");
// const startBtn = document.getElementById("startBtn");

// startBtn.addEventListener("click", () => {
//   counters.forEach((counter) => {
//     const target = +counter.getAttribute("data-count");
//     const duration = 1000;
//     const start = performance.now();

//     function updateCount(timestamp) {
//       const progress = Math.min((timestamp - start) / duration, 1);
//       const value = Math.floor(progress * target);
//       counter.textContent = value;

//       if (progress < 1) {
//         requestAnimationFrame(updateCount);
//       } else {
//         counter.textContent = target;
//       }
//     }
//     requestAnimationFrame(updateCount);
//   });
// });

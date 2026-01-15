document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".album-selector > button");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active")); // Remove from all
      btn.classList.add("active"); // Add to clicked one
    });
  });
});

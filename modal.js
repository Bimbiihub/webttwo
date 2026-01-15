// === Album Filter ===
document.querySelectorAll(".album-selector button").forEach((button) => {
  button.addEventListener("click", () => {
    const selectedAlbum = button.getAttribute("data-album");
    document.querySelectorAll(".album").forEach((album) => {
      const matches =
        selectedAlbum === "all" ||
        album.getAttribute("data-album") === selectedAlbum;
      album.style.display = matches ? "block" : "none";
    });
  });
});

// === Modal Viewer ===
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".card img").forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.classList.add("active");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

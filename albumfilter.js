const buttons = document.querySelectorAll(".album-selector button");
const albums = document.querySelectorAll(".album");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.album;

    albums.forEach((album) => {
      if (selected === "all" || album.dataset.album === selected) {
        album.style.display = "block";
      } else {
        album.style.display = "none";
      }
    });
  });
});

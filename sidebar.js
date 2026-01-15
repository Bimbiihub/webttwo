const monthNamesTr = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const announcementData = {
  2025: {
    "02": ["denetim_1.png"],
  },

  2026: {
    "01": ["kuruluskkiyd.png"],
  },
};

const main = document.getElementById("main");
const sidebar = document.getElementById("sidebar");

for (const year in announcementData) {
  const yearLabel = document.createElement("strong");
  yearLabel.textContent = year;
  yearLabel.addEventListener("click", () => {
    sidebar.querySelectorAll("em").forEach((m) => {
      if (m.dataset.year === year) m.classList.toggle("active");
    });
  });
  sidebar.appendChild(yearLabel);

  for (const month in announcementData[year]) {
    const monthLabel = document.createElement("em");
    const monthIndex = parseInt(month, 10) - 1;
    monthLabel.textContent = monthNamesTr[monthIndex];
    monthLabel.dataset.year = year;
    monthLabel.addEventListener("click", () => {
      sidebar
        .querySelectorAll(`a[data-year='${year}'][data-month='${month}']`)
        .forEach((a) => a.classList.toggle("active"));
    });
    sidebar.appendChild(monthLabel);

    announcementData[year][month].forEach((fileName) => {
      const baseName = fileName.replace(/\.[^/.]+$/, "");
      const id = `announcement-${year}-${month}-${baseName}`;

      // Sidebar link
      const link = document.createElement("a");
      link.href = `#${id}`;
      link.textContent = baseName;
      link.dataset.year = year;
      link.dataset.month = month;
      sidebar.appendChild(link);

      // Paper section
      const section = document.createElement("section");
      section.id = id;
      const paper = document.createElement("div");
      paper.className = "paper";
      const img = document.createElement("img");

      // ✅ This is the updated file path:
      img.src = `announcements/${year}/${month}/${fileName}`;
      img.alt = baseName;

      paper.appendChild(img);
      section.appendChild(paper);
      main.appendChild(section);
    });
  }
}

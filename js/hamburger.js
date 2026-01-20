// Hamburger Menu Functionality
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const mobileMenuOptions = document.querySelectorAll(".mobile-menu-option");
const body = document.body;

// Toggle menu
function toggleMenu() {
  hamburgerBtn.classList.toggle("active");
  mobileMenuOverlay.classList.toggle("active");
  body.classList.toggle("mobile-menu-open");
}

// Open/Close with hamburger button
hamburgerBtn.addEventListener("click", toggleMenu);

// Close when clicking overlay (not the content)
mobileMenuOverlay.addEventListener("click", (e) => {
  if (e.target === mobileMenuOverlay) {
    toggleMenu();
  }
});

// Close menu when clicking a menu option
mobileMenuOptions.forEach((option) => {
  option.addEventListener("click", () => {
    toggleMenu();
  });
});

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenuOverlay.classList.contains("active")) {
    toggleMenu();
  }
});

// Prevent scroll issues on iOS
let scrollPosition = 0;
hamburgerBtn.addEventListener("click", () => {
  if (!body.classList.contains("mobile-menu-open")) {
    scrollPosition = window.pageYOffset;
    body.style.top = `-${scrollPosition}px`;
  } else {
    body.style.top = "";
    window.scrollTo(0, scrollPosition);
  }
});

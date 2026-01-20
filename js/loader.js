// Loader Screen Functionality
document.addEventListener("DOMContentLoaded", function () {
  const loaderScreen = document.getElementById("loader-screen");
  const mainMenu = document.getElementById("main-menu");

  // Exit early if we're not on the homepage
  if (!loaderScreen || !mainMenu) {
    return;
  }

  // Check if loader has already been shown in this session
  const hasSeenLoader = sessionStorage.getItem("loaderShown");

  if (hasSeenLoader) {
    // Skip loader completely - hide it and show menu immediately
    loaderScreen.classList.remove("active");
    loaderScreen.style.display = "none"; // Completely remove from layout
    mainMenu.classList.add("visible");
  } else {
    // First visit - show loader
    loaderScreen.classList.add("active");

    // Function to start the experience
    function startExperience() {
      // Mark loader as shown
      sessionStorage.setItem("loaderShown", "true");

      // Fade out loader
      loaderScreen.classList.remove("active");

      // After loader fades out, show main menu
      setTimeout(() => {
        mainMenu.classList.add("visible");
      }, 800); // Match your CSS transition time (0.8s)
    }

    // Click anywhere on loader to start
    loaderScreen.addEventListener("click", startExperience);

    // Also allow Enter key or Space key to start
    document.addEventListener("keydown", function (event) {
      if (loaderScreen.classList.contains("active")) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          startExperience();
        }
      }
    });
  }
});

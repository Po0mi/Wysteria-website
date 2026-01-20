// Scroll Progress Indicator Functionality
(function () {
  const scrollIndicator = document.getElementById("scrollIndicator");
  const progressLineFill = document.getElementById("progressLineFill");
  const progressDots = document.querySelectorAll(".progress-dot");
  const sections = [];

  // Get all sections
  progressDots.forEach((dot) => {
    const sectionId = dot.dataset.section;
    const section = document.getElementById(sectionId);
    if (section) {
      sections.push({
        id: sectionId,
        element: section,
        dot: dot,
      });
    }
  });

  // Show indicator after loader
  function showIndicator() {
    const loaderScreen = document.getElementById("loader-screen");
    if (!loaderScreen || !loaderScreen.classList.contains("active")) {
      scrollIndicator.classList.add("visible");
    }
  }

  // Update active section based on scroll position
  function updateActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    let activeSection = null;

    sections.forEach((section, index) => {
      const sectionTop = section.element.offsetTop;
      const sectionBottom = sectionTop + section.element.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection = section;
      }
    });

    // Update active state
    progressDots.forEach((dot) => dot.classList.remove("active"));
    if (activeSection) {
      activeSection.dot.classList.add("active");

      // Update progress line
      const activeDotIndex = sections.indexOf(activeSection);
      const progress = (activeDotIndex / (sections.length - 1)) * 100;
      progressLineFill.style.height = `${progress}%`;
    }
  }

  // Smooth scroll to section
  progressDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = dot.dataset.section;
      const section = document.getElementById(sectionId);

      if (section) {
        const offsetTop = section.offsetTop;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize
  setTimeout(showIndicator, 1000);

  // Update on scroll with throttle
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial update
  updateActiveSection();

  // Update on resize
  window.addEventListener("resize", updateActiveSection);
})();

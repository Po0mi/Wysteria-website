const parallaxItems = [
  {
    section: document.querySelector(".hero-menu"),
    video: document.querySelector(".hero-video"),
    strength: 300,
  },
  {
    section: document.querySelector("#guild-activities"),
    video: document.querySelector(".why-video"),
    strength: 300,
  },
];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function updateParallax() {
  parallaxItems.forEach((item) => {
    if (!item.section || !item.video) return;

    const rect = item.section.getBoundingClientRect();
    const progress = clamp(rect.top / window.innerHeight, -1, 1);

    item.video.style.transform = `translate3d(0, ${progress * -item.strength}px, 0)`;
  });
}

window.addEventListener("scroll", () => {
  requestAnimationFrame(updateParallax);
});

updateParallax();

// Tekken-style character selection - FIXED VERSION
const selectCards = document.querySelectorAll(".select-card");
const previewCard = document.getElementById("previewCard");
const previewPlaceholder = document.getElementById("previewPlaceholder");
const previewName = document.querySelector(".preview-name");
const previewRole = document.querySelector(".preview-role");
const previewDomain = document.querySelector(".preview-domain");
const previewPhotoContainer = document.querySelector(
  ".preview-photo .photo-placeholder",
);

selectCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const name = card.dataset.name;
    const role = card.dataset.role;
    const domain = card.dataset.domain;
    const icon = card.dataset.icon;

    // Update preview text content
    previewName.textContent = name;
    previewRole.textContent = role;
    previewDomain.textContent = domain;

    // Get the image from the card
    const cardImg = card.querySelector(".member-image");

    // Clear previous preview photo content
    previewPhotoContainer.innerHTML = "";

    if (cardImg) {
      // If card has an image, clone it for preview
      const previewImg = document.createElement("img");
      previewImg.src = cardImg.src;
      previewImg.alt = name;
      previewImg.className = "member-image";
      previewPhotoContainer.appendChild(previewImg);
    } else {
      // If no image, use placeholder icon
      const placeholderIcon = document.createElement("span");
      placeholderIcon.className = "placeholder-icon";
      placeholderIcon.textContent = icon;
      previewPhotoContainer.appendChild(placeholderIcon);
    }

    // Show/hide elements
    previewPlaceholder.style.display = "none";
    previewCard.classList.add("active");

    // Add active state to card
    card.classList.add("active");
  });

  card.addEventListener("mouseleave", () => {
    card.classList.remove("active");
  });
});

// Reset preview when mouse leaves the entire selection area
const memberSelection = document.querySelector(".member-selection");
memberSelection.addEventListener("mouseleave", () => {
  previewCard.classList.remove("active");
  setTimeout(() => {
    if (!previewCard.classList.contains("active")) {
      previewPlaceholder.style.display = "flex";
    }
  }, 300);
});

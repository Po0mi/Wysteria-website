// Modal functionality
const modal = document.getElementById("requirementsModal");
const openBtn = document.getElementById("openRequirements");
const closeBtn = document.getElementById("closeModal");
const overlay = document.getElementById("modalOverlay");

function openModal() {
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

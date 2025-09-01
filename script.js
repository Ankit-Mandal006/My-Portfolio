// Typing Animation
const roles = ["Developer", "Designer"];
let roleIndex = 0, charIndex = 0;
const typingSpeed = 120;
const erasingSpeed = 80;
const delayBetweenRoles = 1500;

function typeEffect() {
  const typingText = document.querySelector(".typing-text");
  if (charIndex < roles[roleIndex].length) {
    typingText.textContent = "Game " + roles[roleIndex].substring(0, charIndex + 1);
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    setTimeout(eraseEffect, delayBetweenRoles);
  }
}

function eraseEffect() {
  const typingText = document.querySelector(".typing-text");
  if (charIndex > 0) {
    typingText.textContent = "Game " + roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (roles.length) setTimeout(typeEffect, 1000);
});

// Toggle between Projects & Artworks
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.remove("active");
  });
  document.getElementById(sectionId).classList.add("active");
}

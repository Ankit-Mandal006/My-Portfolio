// ─── Typing Animation ─────────────────────────────────────────────
const roles = ["Developer", "Designer"];
let roleIndex = 0, charIndex = 0;
const typingSpeed = 120;
const erasingSpeed = 80;
const delayBetweenRoles = 1500;

function typeEffect() {
  const typingText = document.querySelector(".typing-text");
  if (!typingText) return;
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
  if (!typingText) return;
  if (charIndex > 0) {
    typingText.textContent = "Game " + roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, erasingSpeed);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, typingSpeed);
  }
}

// ─── Toggle Sections ──────────────────────────────────────────────
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  document.querySelectorAll(".switch-buttons button").forEach(btn => {
    btn.classList.remove("active");
    if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(sectionId)) {
      btn.classList.add("active");
    }
  });
}

// ─── Image helper: returns img tag or a styled placeholder ────────
function imgOrPlaceholder(src, title) {
  if (src && src.trim() !== "") {
    return `<img src="${src}" alt="${title}" onerror="this.outerHTML=noImgPlaceholder('${title}')" />`;
  }
  return noImgPlaceholder(title);
}

function noImgPlaceholder(title) {
  return `<div style="
    width:100%; height:160px; background:#111; display:flex;
    align-items:center; justify-content:center; flex-direction:column; gap:8px;
    color:#333; font-size:0.75rem; font-family:monospace; letter-spacing:1px;
  ">
    <span style="font-size:1.8rem;">🎮</span>
    <span>No Preview</span>
  </div>`;
}

// ─── Render Portfolio from data.json ──────────────────────────────
async function loadPortfolio() {
  const projectGrid = document.getElementById("projects-grid");
  const artworkGrid = document.getElementById("artworks-grid");

  try {
    const response = await fetch("data.json");
    if (!response.ok) throw new Error("data.json not found");
    const data = await response.json();

    projectGrid.innerHTML = "";
    artworkGrid.innerHTML = "";

    data.projects.forEach(item => {
      projectGrid.innerHTML += `
        <a href="${item.link}" target="_blank" class="game-card-link">
          <div class="game-card">
            ${imgOrPlaceholder(item.img, item.title)}
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </a>`;
    });

    data.artworks.forEach(item => {
      artworkGrid.innerHTML += `
        <a href="${item.link}" target="_blank" class="game-card-link">
          <div class="game-card">
            <div class="overlay-container">
              ${imgOrPlaceholder(item.img, item.title)}
              <div class="overlay-text">View on ArtStation</div>
            </div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
          </div>
        </a>`;
    });

  } catch (err) {
    console.error("Could not load portfolio data:", err);
    projectGrid.innerHTML = `<p style="color:#888;">No projects found. Add entries via admin.html.</p>`;
  }
}

// ─── Copy phone number on click ───────────────────────────────────
document.querySelectorAll("[data-copy]").forEach(el => {
  el.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText(el.dataset.copy).then(() => alert("Phone number copied!"));
  });
});

// ─── Init ─────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  if (roles.length) setTimeout(typeEffect, 1000);
  loadPortfolio();
});
/* ================= PAGE SWITCH ================= */
const pages = document.querySelectorAll(".page");
const bgHome = document.querySelector(".bg-home");
const canvas = document.getElementById("codeRain");

document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(btn.dataset.page).classList.add("active");

    if (btn.dataset.page === "scripts") {
      bgHome.style.opacity = "0";
      canvas.style.opacity = "1";
    } else {
      bgHome.style.opacity = "1";
      canvas.style.opacity = "0";
    }
  };
});

/* ================= TYPEWRITER ================= */
document.querySelectorAll(".typewriter").forEach(el => {
  const text = el.textContent;
  el.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, 60);
});

/* ================= LOAD DATA ================= */
fetch("data.json")
  .then(res => res.json())
  .then(data => {

    // ROBLOX SCRIPTS
    const scriptsGrid = document.getElementById("scriptsGrid");
    data.scripts.forEach(script => {
      const box = document.createElement("div");
      box.className = "exploit";

      box.innerHTML = `
        <h3>${script.name}</h3>
        <div class="code">${script.code}</div>
      `;

      scriptsGrid.appendChild(box);
    });

    // GAMES
    const gamesGrid = document.getElementById("gamesGrid");
    data.games.forEach(game => {
      const card = document.createElement("div");
      card.className = "exploit";
      card.textContent = game.name;
      card.onclick = () => openGame(game.name, game.file);
      gamesGrid.appendChild(card);
    });
  });

/* ================= GAME OVERLAY ================= */
const overlay = document.getElementById("gameOverlay");
const iframe = document.getElementById("gameFrame");
const gameTitle = document.getElementById("gameTitle");

function openGame(name, file) {
  gameTitle.textContent = name;
  iframe.src = file;
  overlay.classList.remove("hidden");
}

function closeGame() {
  iframe.src = "";
  overlay.classList.add("hidden");
}

function fullscreenGame() {
  if (iframe.requestFullscreen) iframe.requestFullscreen();
}

/* ================= DISCORD ================= */
document.getElementById("discordBtn").onclick = () => {
  window.open("https://discord.gg/webfish", "_blank");
};

/* ================= GREY CODE RAIN ================= */
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const columns = Math.floor(canvas.width / 14);
const drops = Array(columns).fill(1);

function rain() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "14px monospace";

  drops.forEach((y, i) => {
    const char = Math.floor(Math.random() * 10);
    ctx.fillText(char, i * 14, y * 14);
    if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(rain, 33);

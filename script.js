/* ======================
   Portfolio — script.js
====================== */

console.log("✅ Script loaded");

// ======================
// State
// ======================

let clickCount = 0;
const THEME_KEY = "portfolio_theme";

// ======================
// DOM
// ======================

const themeBtn       = document.getElementById("themeBtn");
const countBtn       = document.getElementById("countBtn");
const countLabel     = document.getElementById("countLabel");
const lastUpdatedEl  = document.getElementById("lastUpdated");
const loadDataBtn    = document.getElementById("loadDataBtn");
const dataStatus     = document.getElementById("dataStatus");
const dataOutput     = document.getElementById("dataOutput");

// ======================
// Theme
// ======================

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}

if (themeBtn) themeBtn.addEventListener("click", toggleTheme);

// ======================
// Counter
// ======================

if (countBtn) {
  countBtn.addEventListener("click", () => {
    clickCount++;
    if (countLabel) countLabel.textContent = clickCount;
    if (clickCount === 5) console.log("🔥 Power user detected");
  });
}

// ======================
// Last updated
// ======================

function displayLastUpdated() {
  if (!lastUpdatedEl) return;
  const d = new Date();
  const pad = n => String(n).padStart(2, "0");
  lastUpdatedEl.textContent = `Last updated: ${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

// ======================
// API Demo
// ======================

async function loadExternalData() {
  if (!dataOutput) return;
  dataOutput.innerHTML = "";
  dataStatus.textContent = "Fetching data…";
  dataStatus.className = "data-status loading";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();

    dataStatus.textContent = "";
    dataStatus.className = "data-status";

    dataOutput.innerHTML = `
      <div class="user-card">
        <h3>API response</h3>
        <p><strong>Name</strong>${data.name}</p>
        <p><strong>Email</strong>${data.email}</p>
        <p><strong>Company</strong>${data.company.name}</p>
        <p><strong>City</strong>${data.address.city}</p>
      </div>`;

    console.log("✅ Data loaded:", data);
  } catch (err) {
    dataStatus.textContent = "Error: " + err.message;
    dataStatus.className = "data-status error";
    console.error("❌", err);
  }
}

if (loadDataBtn) loadDataBtn.addEventListener("click", loadExternalData);

// ======================
// Init
// ======================

function init() {
  loadTheme();
  displayLastUpdated();
  const h = new Date().getHours();
  const greeting = h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  console.log("👋", greeting);
  console.log("✨ Portfolio ready");
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", init)
  : init();
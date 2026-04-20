/* ======================
   Lecture 06 - Async JavaScript & API Integration
====================== */

console.log("✅ Script loaded");
console.log("📄 Portfolio page ready");

// ======================
// State Variables
// ======================

let clickCount = 0;
let isDarkMode = false;

// localStorage key for theme
const THEME_KEY = "portfolio_theme";

// ======================
// DOM Elements
// ======================

const themeBtn = document.getElementById("themeBtn");
const countBtn = document.getElementById("countBtn");
const lastUpdatedEl = document.getElementById("lastUpdated");
const loadDataBtn = document.getElementById("loadDataBtn");
const dataStatus = document.getElementById("dataStatus");
const dataOutput = document.getElementById("dataOutput");

// ======================
// Theme Management
// ======================

/**
 * Load saved theme from localStorage on page load
 */
function loadTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  
  if (savedTheme === "dark") {
    isDarkMode = true;
    document.body.classList.add("dark");
    console.log("🎨 Loaded saved theme: Dark");
  } else {
    isDarkMode = false;
    document.body.classList.remove("dark");
    console.log("🎨 Loaded saved theme: Light");
  }
}

/**
 * Toggle between light and dark theme
 */
function setTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark");

  // Save theme to localStorage
  const themeValue = isDarkMode ? "dark" : "light";
  localStorage.setItem(THEME_KEY, themeValue);

  console.log("🎨 Theme changed →", isDarkMode ? "Dark" : "Light");
  console.log("💾 Theme saved to localStorage");
}

// ======================
// Click Counter
// ======================

/**
 * Handle click count tracking
 */
function handleClickCount() {
  clickCount++;

  console.log("🖱️ Button clicked:", clickCount, "times");

  if (clickCount === 5) {
    console.log("🔥 Power user detected");
  }
}

// ======================
// Event Listeners
// ======================

themeBtn.addEventListener("click", () => {
  console.log("Theme button pressed");
  setTheme();
});

countBtn.addEventListener("click", () => {
  console.log("Counter button pressed");
  handleClickCount();
});

// ======================
// Greeting Message
// ======================

/**
 * Show time-based greeting in console
 */
function showGreeting() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 18 ? "Good afternoon" :
    "Good evening";

  console.log("👋", greeting, "visitor");
}

// ======================
// Last Updated Date
// ======================

/**
 * Display the last updated date in the footer
 * Format: Last updated: YYYY-MM-DD
 */
function displayLastUpdated() {
  if (!lastUpdatedEl) {
    console.warn("⚠️ lastUpdated element not found");
    return;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  
  const formattedDate = `${year}-${month}-${day}`;
  
  lastUpdatedEl.textContent = `Last updated: ${formattedDate}`;
  
  console.log("📅 Last updated date set:", formattedDate);
}

// ======================
// External Data Demo (API Fetch)
// ======================

// Why do we use async/await?
// We use async/await to handle asynchronous operations (like API calls) in a way that looks
// and behaves like synchronous code, making it easier to read and understand. It allows us
// to wait for promises to resolve without blocking the browser or using complex .then() chains.

// Why do we check response.ok?
// We check response.ok because the fetch API does not automatically throw an error for HTTP
// error status codes (like 404 or 500). By checking response.ok, we can detect these errors
// and handle them appropriately, ensuring we only process successful responses.

// Why do we use try/catch?
// We use try/catch to handle errors that might occur during the async operation, such as
// network failures, timeouts, or HTTP errors. This prevents our application from crashing
// and allows us to display meaningful error messages to users.

/**
 * Load user data from external API
 */
async function loadExternalData() {
  // Clear previous output
  dataOutput.innerHTML = "";
  
  // Show loading status
  dataStatus.textContent = "Loading...";
  dataStatus.className = "data-status loading";
  
  try {
    // Fetch data from API
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    
    // Check if response is OK (status 200-299)
    if (!response.ok) {
      throw new Error("HTTP Error: " + response.status);
    }
    
    // Convert response to JSON
    const data = await response.json();
    
    // Clear loading status
    dataStatus.textContent = "";
    dataStatus.className = "data-status";
    
    // Create and display user data
    const userCard = document.createElement("div");
    userCard.className = "user-card";
    
    userCard.innerHTML = `
      <h3>User Information</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company.name}</p>
    `;
    
    dataOutput.appendChild(userCard);
    
    console.log("✅ Data loaded successfully:", data);
    
  } catch (error) {
    // Handle any errors
    dataStatus.textContent = "Error loading data";
    dataStatus.className = "data-status error";
    
    console.error("❌ Error:", error.message);
  }
}

// Add event listener to Load Data button
if (loadDataBtn) {
  loadDataBtn.addEventListener("click", () => {
    console.log("Load Data button clicked");
    loadExternalData();
  });
}

// ======================
// Initialization
// ======================

/**
 * Initialize the page on load
 */
function init() {
  loadTheme();          // Load saved theme preference
  showGreeting();       // Show greeting in console
  displayLastUpdated(); // Set last updated date
  
  console.log("✨ Page initialized successfully");
}

// Run initialization when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
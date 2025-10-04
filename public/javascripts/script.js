
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const menu = document.querySelector(".menu");
const scrollButton = document.querySelector(".scroll-button");

menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
  menuBtn.style.display = "none";
});

document.querySelectorAll(".menu li a").forEach(link => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
    menuBtn.style.display = "block";
  });
});

cancelBtn.addEventListener("click", () => {
  menu.classList.remove("active");
  menuBtn.style.display = "block";
});

window.addEventListener("scroll", () => {
  scrollButton.style.display = window.scrollY > 300 ? "block" : "none";
});

// ===== CRISP CHAT =====
document.addEventListener("DOMContentLoaded", () => {
  const connectBtn = document.querySelector(".conn");
  if (!connectBtn) {
    console.warn("Connect button .conn not found.");
    return;
  }

  // Setup Crisp globals
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = "a17022af-9ccc-404b-be07-a0d9189a3cbc";

  // Insert Crisp script if not already added
  (function () {
    if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;
    const d = document;
    const s = d.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = 1;
    d.getElementsByTagName("head")[0].appendChild(s);
  })();

  // Hide bubble once Crisp is loaded
  window.$crisp.push(["on", "session:loaded", () => {
    window.$crisp.push(["do", "chat:hide"]);
  }]);

  // Function to open Crisp chat
  function openCrispChat() {
    try {
      window.$crisp.push(["do", "chat:show"]);
      window.$crisp.push(["do", "chat:open"]);
    } catch (err) {
      console.error("Crisp open error:", err);
    }
  }

  // When chat is closed → hide bubble again
  window.$crisp.push(["on", "chat:closed", () => {
    window.$crisp.push(["do", "chat:hide"]);
   
  }]);

  // Attach event listener to Connect button
  connectBtn.addEventListener("click", openCrispChat);
});


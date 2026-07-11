document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const cancelBtn = document.querySelector(".cancel-btn");
  const menu = document.querySelector(".menu");
  const scrollButton = document.querySelector(".scroll-button");

  // MENU – fix side menu button display issues
  if (menuBtn && menu && cancelBtn) {
    menuBtn.addEventListener("click", () => {
      menu.classList.add("active");
      menuBtn.style.display = "none";
      if (cancelBtn) {
        cancelBtn.style.display = "block";
      }
    });

    document.querySelectorAll(".menu li a").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
        menuBtn.style.display = "block";
        if (cancelBtn) {
          cancelBtn.style.display = "none";
        }
      });
    });

    cancelBtn.addEventListener("click", () => {
      menu.classList.remove("active");
      menuBtn.style.display = "block";
      cancelBtn.style.display = "none";
    });
  }

  // Scroll to top button
  if (scrollButton) {
    window.addEventListener("scroll", () => {
      scrollButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===== CRISP CHAT =====
  const connectBtn = document.querySelector(".conn");
  if (connectBtn) {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "a17022af-9ccc-404b-be07-a0d9189a3cbc";

    (function () {
      if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) return;
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    window.$crisp.push(["on", "session:loaded", () => {
      window.$crisp.push(["do", "chat:hide"]);
    }]);

    function openCrispChat() {
      try {
        window.$crisp.push(["do", "chat:show"]);
        window.$crisp.push(["do", "chat:open"]);
      } catch (err) {
        console.error("Crisp open error:", err);
      }
    }

    window.$crisp.push(["on", "chat:closed", () => {
      window.$crisp.push(["do", "chat:hide"]);
    }]);

    connectBtn.addEventListener("click", openCrispChat);
  }
});

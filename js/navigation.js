/* navigation.js — mobile menu toggle (open/close, Escape, resize, link click). */

// ---------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------
(function () {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileNav");

  function closeMenu() {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openMenu() {
    menu.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 960) closeMenu();
  });
})();

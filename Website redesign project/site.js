/* COULD — shared site behaviour (vanilla, dependency-free) */
(function () {
  "use strict";

  // —— scroll reveal ——
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  // —— duplicate marquee track for seamless loop ——
  function initMarquee() {
    document.querySelectorAll(".marquee__track").forEach(function (track) {
      if (track.dataset.cloned) return;
      track.dataset.cloned = "1";
      track.innerHTML = track.innerHTML + track.innerHTML;
    });
  }

  // —— mobile nav ——
  function initMobileNav() {
    var btn = document.querySelector(".nav-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () {
      var open = menu.hasAttribute("hidden");
      if (open) { menu.removeAttribute("hidden"); btn.setAttribute("aria-expanded", "true"); }
      else { menu.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); }
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { menu.setAttribute("hidden", ""); btn.setAttribute("aria-expanded", "false"); });
    });
  }

  // —— tiny cart count (storefront still alive) ——
  function initCart() {
    var KEY = "could_cart_count";
    function render() {
      var n = parseInt(localStorage.getItem(KEY) || "0", 10) || 0;
      document.querySelectorAll("[data-cart-count]").forEach(function (el) { el.textContent = n; });
    }
    document.querySelectorAll("[data-add-cart]").forEach(function (b) {
      b.addEventListener("click", function () {
        var n = (parseInt(localStorage.getItem(KEY) || "0", 10) || 0) + 1;
        localStorage.setItem(KEY, String(n));
        render();
        var prev = b.textContent;
        b.textContent = "Added ✓";
        setTimeout(function () { b.textContent = prev; }, 1400);
      });
    });
    render();
  }

  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () { initMarquee(); initMobileNav(); initCart(); });
})();

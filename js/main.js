(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Nav toggle ---------- */
  var nav = document.querySelector(".nav");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  navMenu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeNav();
  });

  document.addEventListener("click", function (e) {
    if (!nav.classList.contains("is-open")) return;
    if (!nav.contains(e.target)) closeNav();
  });

  /* ---------- Footer year ---------- */
  var footerYear = document.getElementById("footer-year");
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  var revealEls = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });

  /* ---------- Lightbox ---------- */
  var cards = Array.prototype.slice.call(
    document.querySelectorAll(".work-card")
  );
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox.querySelector(".lightbox__img");
  var lightboxCaption = lightbox.querySelector(".lightbox__caption");
  var current = 0;

  function openLightbox(index) {
    current = index;
    var card = cards[current];
    var img = card.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = card.getAttribute("data-title");
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function step(delta) {
    var next = current + delta;
    if (next < 0) next = cards.length - 1;
    if (next >= cards.length) next = 0;
    openLightbox(next);
  }

  cards.forEach(function (card, i) {
    card.addEventListener("click", function () {
      openLightbox(i);
    });
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", function () {
    step(-1);
  });
  lightbox.querySelector(".lightbox__nav--next").addEventListener("click", function () {
    step(1);
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
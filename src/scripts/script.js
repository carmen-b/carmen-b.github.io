document.addEventListener("DOMContentLoaded", () => {
  const address = "dapper_wheeled0y@icloud.com";

  setupEmailLinks(address);
  setupContactForm(address);
  setupNavigation();
  setupCarousels();
  showSuccessState();
});

function setupEmailLinks(address) {
  document.querySelectorAll("a.email-address").forEach((link) => {
    link.setAttribute("href", `mailto:${address}`);
    if (!link.textContent.trim()) {
      link.textContent = address;
    }
  });
}

function setupContactForm(address) {
  const form = document.querySelector(".contact-form");
  if (!form) {
    return;
  }

  form.setAttribute("action", `//formspree.io/${address}`);
}

function showSuccessState() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("sent") !== "1") {
    return;
  }

  document.querySelectorAll(".contact-sent").forEach((notice) => {
    notice.style.display = "block";
  });
}

function setupNavigation() {
  const nav = document.querySelector("#site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const dropdown = document.querySelector(".menu-dropdown");
  const trigger = dropdown ? dropdown.querySelector(".menu-trigger") : null;

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const nextState = nav.getAttribute("data-open") !== "true";
      nav.setAttribute("data-open", String(nextState));
      toggle.setAttribute("aria-expanded", String(nextState));
      if (!nextState) {
        closeDropdown(dropdown, trigger);
      }
    });
  }

  if (trigger && dropdown) {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.contains("is-open");
      if (isOpen) {
        closeDropdown(dropdown, trigger);
      } else {
        dropdown.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  }

  document.addEventListener("click", (event) => {
    if (dropdown && trigger && !dropdown.contains(event.target)) {
      closeDropdown(dropdown, trigger);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (dropdown && trigger) {
        closeDropdown(dropdown, trigger);
      }
      if (toggle && nav && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  if (nav) {
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.matchMedia("(max-width: 760px)").matches && toggle) {
          nav.setAttribute("data-open", "false");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }
}

function closeDropdown(dropdown, trigger) {
  if (!dropdown || !trigger) {
    return;
  }

  dropdown.classList.remove("is-open");
  trigger.setAttribute("aria-expanded", "false");
}

function setupCarousels() {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".item-carousel");
    const slides = track ? Array.from(track.querySelectorAll(".item-slide")) : [];
    const prev = carousel.querySelector(".carousel-control.prev");
    const next = carousel.querySelector(".carousel-control.next");
    const dotsContainer = carousel.querySelector(".carousel-dots");

    if (!track || slides.length <= 1) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
      if (dotsContainer) dotsContainer.hidden = true;
      return;
    }

    const dots = slides.map((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `View image ${index + 1}`);
      dot.addEventListener("click", () => scrollToIndex(track, index));
      dotsContainer.appendChild(dot);
      return dot;
    });

    function update() {
      const index = getActiveSlideIndex(track, slides.length);
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === index);
      });
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
    }

    if (prev) {
      prev.addEventListener("click", () => {
        scrollToIndex(track, getActiveSlideIndex(track, slides.length) - 1);
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        scrollToIndex(track, getActiveSlideIndex(track, slides.length) + 1);
      });
    }

    track.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollToIndex(track, getActiveSlideIndex(track, slides.length) - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollToIndex(track, getActiveSlideIndex(track, slides.length) + 1);
      }
    });

    track.addEventListener("scroll", () => {
      window.requestAnimationFrame(update);
    });

    window.addEventListener("resize", update);
    update();
  });
}

function getActiveSlideIndex(track, total) {
  const width = track.clientWidth || 1;
  const index = Math.round(track.scrollLeft / width);
  return Math.max(0, Math.min(index, total - 1));
}

function scrollToIndex(track, index) {
  const total = track.querySelectorAll(".item-slide").length;
  const clamped = Math.max(0, Math.min(index, total - 1));
  const left = clamped * track.clientWidth;
  track.scrollTo({ left, behavior: "smooth" });
}

const app = document.querySelector(".app");
const photoCards = document.querySelectorAll(".photo-card");
const aboutViews = document.querySelectorAll(".about-view");
const backButtons = document.querySelectorAll(".back-button");
const menuLinks = document.querySelectorAll(".menu-link");
const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const carouselArrows = document.querySelectorAll(".carousel-arrow");
const pageLinks = document.querySelectorAll(".page-link");
const petCards = document.querySelectorAll(".pet-card");

let activeView = null;

const openView = (viewName, triggerEl = null) => {
  const target = document.querySelector(`.about-view[data-view="${viewName}"]`);
  if (!target) return;

  if (activeView) {
    activeView.classList.remove("is-active");
    activeView.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll(".zoom-target").forEach((el) => {
    el.classList.remove("zoom-target");
  });

  if (triggerEl) {
    triggerEl.classList.add("zoom-target");
  }

  document.body.classList.toggle("is-imaging", viewName === "imaging");

  activeView = target;
  activeView.classList.add("is-active");
  activeView.setAttribute("aria-hidden", "false");
  app.classList.add("is-about");
  window.scrollTo({ top: 0, behavior: "auto" });
};

const closeView = () => {
  if (activeView) {
    activeView.classList.remove("is-active");
    activeView.setAttribute("aria-hidden", "true");
    activeView = null;
  }
  document.querySelectorAll(".zoom-target").forEach((el) => {
    el.classList.remove("zoom-target");
  });
  app.classList.remove("is-about");
  document.body.classList.remove("is-imaging");
};

photoCards.forEach((card) => {
  card.addEventListener("click", () => openView(card.dataset.target, card));
});

pageLinks.forEach((link) => {
  link.addEventListener("click", () => openView(link.dataset.target, link));
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.dataset.target;
    const scrollTarget = link.dataset.scroll;

    if (scrollTarget) {
      const section = document.querySelector(`#${scrollTarget}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (target) {
      openView(target);
    }
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.back;
    if (target) {
      openView(target, button);
      return;
    }
    closeView();
  });
});

if (carousel && carouselItems.length) {
  let activeIndex = 0;

  const updateCarousel = () => {
    carouselItems.forEach((item, index) => {
      item.classList.remove("is-left", "is-center", "is-right");
      if (index === activeIndex) {
        item.classList.add("is-center");
      } else if (index === (activeIndex + carouselItems.length - 1) % carouselItems.length) {
        item.classList.add("is-left");
      } else if (index === (activeIndex + 1) % carouselItems.length) {
        item.classList.add("is-right");
      }
    });
  };

  const moveCarousel = (direction) => {
    if (direction === "next") {
      activeIndex = (activeIndex + carouselItems.length - 1) % carouselItems.length;
    } else {
      activeIndex = (activeIndex + 1) % carouselItems.length;
    }
    updateCarousel();
  };

  carouselArrows.forEach((arrow) => {
    arrow.addEventListener("click", () => moveCarousel(arrow.dataset.dir));
  });

  updateCarousel();
}

petCards.forEach((card) => {
  const toggle = card.querySelector(".pet-toggle");
  const details = card.querySelector(".pet-details");

  if (!toggle || !details) return;

  toggle.addEventListener("mouseenter", () => {
    card.classList.add("is-hovered");
  });

  toggle.addEventListener("mouseleave", () => {
    card.classList.remove("is-hovered");
  });

  toggle.addEventListener("click", () => {
    const isOpen = card.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    details.setAttribute("aria-hidden", String(!isOpen));
  });
});

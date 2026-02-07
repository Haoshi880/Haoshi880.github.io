  const photoCards = document.querySelectorAll(".photo-card");
  const menuLinks = document.querySelectorAll(".menu-link");
  const menuTitle = document.querySelector(".menu-title--link");
  const carousel = document.querySelector(".carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const carouselArrows = document.querySelectorAll(".carousel-arrow");
  const pageLinks = document.querySelectorAll(".page-link");
  const petCards = document.querySelectorAll(".pet-card");
  const timelineLinks = document.querySelectorAll(".timeline-image-link");

  const menu = document.querySelector(".top-menu");
  const getScrollOffset = () => {
    const menuHeight = menu ? menu.getBoundingClientRect().height : 0;
    return menuHeight - 30;
  };

  const scrollToSection = (targetId) => {
    if (!targetId) return;
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const section = document.querySelector(`#${targetId}`);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
    window.scrollTo({ top, behavior: "smooth" });
  };

  photoCards.forEach((card) => {
    card.addEventListener("click", () => scrollToSection(card.dataset.scroll));
  });

  pageLinks.forEach((link) => {
    link.addEventListener("click", () => scrollToSection(link.dataset.scroll));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => scrollToSection(link.dataset.scroll));
  });

  if (menuTitle) {
    menuTitle.addEventListener("click", () => scrollToSection(menuTitle.dataset.scroll));
  }

  timelineLinks.forEach((link) => {
    link.addEventListener("click", () => scrollToSection(link.dataset.scroll));
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

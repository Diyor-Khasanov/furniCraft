document.addEventListener("DOMContentLoaded", function () {
  // Initialize Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector(".header");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    header.classList.toggle("mobile-menu-open");
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".header__menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (header.classList.contains("mobile-menu-open")) {
        menuToggle.classList.remove("active");
        header.classList.remove("mobile-menu-open");
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize Parallax Effect
  const heroParallax = document.querySelector(".hero__parallax");
  if (heroParallax) {
    new Parallax(heroParallax, {
      relativeInput: true,
      clipRelativeInput: true,
      hoverOnly: true,
    });
  }

  // Initialize Swiper
  const aboutSwiper = new Swiper(".about-swiper", {
    loop: true,
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
        rotate: [0, 0, -20],
      },
      next: {
        translate: ["100%", 0, 0],
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    on: {
      slideChangeTransitionStart: function () {
        const progress = document.querySelector(".slide-progress");
        if (progress) {
          progress.style.animation = "none";
          void progress.offsetWidth; // Trigger reflow
          progress.style.animation = "progressAnimation 5s linear forwards";
        }
      },
    },
  });

  // Initialize VanillaTilt for cards
  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    VanillaTilt.init(card, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
      gyroscope: true,
    });
  });

  // Product Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      productCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Here you would typically send the data to a server
      console.log("Form submitted:", data);

      // Show success message
      alert("Thank you for your message! We will contact you soon.");

      // Reset form
      this.reset();
    });
  }

  // Initialize Scroll Reveal Animations
  const scrollElements = document.querySelectorAll("[data-scroll]");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("scroll-animate");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  scrollElements.forEach((element) => {
    // Set initial transform based on data-scroll attribute
    const direction = element.getAttribute("data-scroll");
    if (direction === "left") {
      element.style.transform = "translateX(-50px)";
    } else if (direction === "right") {
      element.style.transform = "translateX(50px)";
    } else {
      element.style.transform = "translateY(50px)";
    }

    scrollObserver.observe(element);
  });

  // Initialize Counter Animation
  const counters = document.querySelectorAll(".counter");
  const speed = 200;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-count");
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target;
      }
    });
  }

  // Start counter animation when counters are in view
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Initialize translations if available
  if (typeof initTranslations === "function") {
    initTranslations();
  }

  // Initialize theme if available
  if (typeof initTheme === "function") {
    initTheme();
  }

  // Initialize product spinner if available
  if (typeof ProductSpinner === "function") {
    const spinners = document.querySelectorAll(".product-viewer");
    spinners.forEach((container) => {
      new ProductSpinner(container);
    });
  }

  // Initialize particles if available
  if (
    typeof particlesJS === "function" &&
    document.getElementById("particles-js")
  ) {
    particlesJS("particles-js", particlesConfig);
  }
});

// Handle window resize events
window.addEventListener("resize", function () {
  // You can add responsive checks here if needed
});

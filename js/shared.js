document.addEventListener("DOMContentLoaded", () => {
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("reo-theme", theme);
    const isLight = theme === "light";
    const icon = document.getElementById("mobile-theme-icon");
    const btn = document.getElementById("mobile-theme-btn");
    if (icon) icon.textContent = isLight ? "🌙" : "☀️";
    if (btn)
      btn.innerHTML = `<span>${isLight ? "🌙" : "☀️"}</span> Switch to ${isLight ? "Dark" : "Light"} Mode`;
  };

  const savedTheme = localStorage.getItem("reo-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  document.getElementById("theme-toggle-btn")?.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });
  document.getElementById("mobile-theme-btn")?.addEventListener("click", () => {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });

  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hidden");
      if (window.AOS) AOS.refresh();
      window.dispatchEvent(new Event("resize"));
    }, 1200);
  }

  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      },
      { passive: true },
    );
    const path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach((a) => {
      if (a.getAttribute("href")?.split("/").pop() === path)
        a.classList.add("active");
    });
  }

  const ham = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeBtn = document.getElementById("mobile-menu-close");
  if (ham && mobileMenu) {
    ham.addEventListener("click", () => {
      ham.classList.toggle("open");
      mobileMenu.classList.toggle("open");
      document.body.style.overflow = mobileMenu.classList.contains("open")
        ? "hidden"
        : "";
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        ham.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      });
    }
    mobileMenu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        ham.classList.remove("open");
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
      }),
    );
  }

  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W,
      H,
      particles = [];
    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = H + Math.random() * 20;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 0.6 + 0.2;
        this.opacity = 0;
        this.maxOp = Math.random() * 0.6 + 0.2;
        this.drift = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.y -= this.speed;
        this.x += this.drift;
        if (this.y > H * 0.6)
          this.opacity = Math.min(this.maxOp, this.opacity + 0.015);
        else this.opacity = Math.max(0, this.opacity - 0.012);
        if (this.y < -10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,193,7,${this.opacity})`;
        ctx.fill();
      }
    }
    for (let i = 0; i < 60; i++) {
      const p = new Particle();
      p.y = Math.random() * H;
      particles.push(p);
    }
    const animParticles = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animParticles);
    };
    animParticles();
  }

  if (window.AOS)
    AOS.init({
      duration: 800,
      once: false,
      offset: 80,
      easing: "ease-out-cubic",
    });

  const counters = document.querySelectorAll(".counter-num");
  if (counters.length) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const animCounter = (el) => {
      const target = parseFloat(el.dataset.target),
        suffix = el.dataset.suffix || "",
        dec = el.dataset.dec || 0,
        dur = 2200;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / dur, 1);
        el.textContent = (easeOut(prog) * target).toFixed(dec) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animCounter(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    counters.forEach((c) => obs.observe(c));
  }

  const carousel = document.querySelector(".testimonial-track");
  if (carousel) {
    const slides = carousel.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".t-dot");
    let current = 0,
      timer;
    const goTo = (i) => {
      current = (i + slides.length) % slides.length;
      carousel.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("active", idx === current));
    };
    const auto = () => {
      timer = setInterval(() => goTo(current + 1), 5500);
    };
    const stop = () => clearInterval(timer);
    document.querySelector(".t-prev")?.addEventListener("click", () => {
      stop();
      goTo(current - 1);
      auto();
    });
    document.querySelector(".t-next")?.addEventListener("click", () => {
      stop();
      goTo(current + 1);
      auto();
    });
    dots.forEach((d, i) =>
      d.addEventListener("click", () => {
        stop();
        goTo(i);
        auto();
      }),
    );
    auto();
  }

  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lb-img");
  if (lightbox && lbImg) {
    document.querySelectorAll("[data-lb]").forEach((el) =>
      el.addEventListener("click", () => {
        lbImg.src = el.dataset.lb;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      }),
    );
    const closeLb = () => {
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    };
    document.getElementById("lb-close")?.addEventListener("click", closeLb);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLb();
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector(".btn-submit");
      const success = document.getElementById("form-success");
      const error = document.getElementById("form-error");
      btn.textContent = "Sending…";
      btn.disabled = true;
      if (error) error.classList.remove("show");

      const APPS_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzObXgp3h-lKoA9Hr_ioLhjLpI3WRGfGRHxWPRHpyBKKL_oiOAnMXLKvb8G9stxeeAiyg/exec";
      const payload = Object.fromEntries(new FormData(contactForm).entries());

      try {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
        success.classList.add("show");
        contactForm.reset();
      } catch (err) {
        if (error) error.classList.add("show");
        else {
          success.classList.add("show");
          contactForm.reset();
        }
      } finally {
        btn.textContent = "Send Message →";
        btn.disabled = false;
        setTimeout(() => {
          success.classList.remove("show");
          if (error) error.classList.remove("show");
        }, 7000);
      }
    });
  }

  document.querySelectorAll(".pkg-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      // Update active tab
      document
        .querySelectorAll(".pkg-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedCat = tab.dataset.cat;

      document.querySelectorAll(".pkg-card").forEach((card) => {
        const cardCat = card.dataset.cat;
        const shouldShow = selectedCat === "all" || cardCat === selectedCat;

        if (shouldShow) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      if (window.AOS) {
        AOS.refresh();
      }
    });
  });

  document.querySelectorAll(".gf-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".gf-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".g-item").forEach((item) => {
        item.style.display =
          filter === "all" || item.dataset.filter === filter ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".hero-reveal").forEach((el, i) => {
    el.style.animationDelay = `${0.4 + i * 0.2}s`;
    el.style.animationFillMode = "both";
  });
});

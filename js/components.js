(function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const NAV_LINKS = [
    { href: "../index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "services.html", label: "Services" },
    { href: "gallery.html", label: "Gallery" },
    { href: "blog.html", label: "Blog" },
    { href: "contact.html", label: "Contact" },
  ];

  const isRoot = !window.location.pathname.includes("/pages/");
  function resolveHref(href) {
    return isRoot ? href.replace("../", "") : href;
  }

  const logoPath = isRoot ? "asset/logo.png" : "../asset/logo.png";

  function navLinksHTML() {
    return NAV_LINKS.map((l) => {
      const href = resolveHref(l.href);
      const file = href.split("/").pop();
      const act = file === currentPage ? " active" : "";
      const isCta = l.label === "Contact";
      return `<li><a href="${href}" class="${isCta ? "nav-cta" : ""}${act}">${l.label}</a></li>`;
    }).join("");
  }

  function mobileLinksHTML() {
    return NAV_LINKS.map(
      (l) => `<a href="${resolveHref(l.href)}">${l.label}</a>`,
    ).join("");
  }

  const navTarget = document.getElementById("navbar-placeholder");
  if (navTarget) {
    navTarget.outerHTML = `
<nav id="navbar">
  <a class="nav-logo" href="${resolveHref("../index.html")}">
    <img src="${logoPath}" alt="REO Travels & Tours Logo"/>
  </a>
  <ul class="nav-links">${navLinksHTML()}</ul>
  <div style="display:flex;align-items:center;gap:12px;">
    <div class="theme-toggle-wrap" title="Toggle light/dark mode">
      <span class="theme-icon" id="theme-icon-sun">☀️</span>
      <button class="theme-toggle" id="theme-toggle-btn" aria-label="Toggle theme"></button>
      <span class="theme-icon" id="theme-icon-moon">🌙</span>
    </div>
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-menu">
  <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">✕</button>
  <div class="mobile-menu-inner">
    ${mobileLinksHTML()}
    <button class="mobile-theme-btn" id="mobile-theme-btn">
      <span id="mobile-theme-icon">☀️</span> Switch to Light Mode
    </button>
  </div>
  <span class="mobile-menu-tagline">Birthing Travel Dreams ✦ Since 2022</span>
</div>`;
  }

  const footTarget = document.getElementById("footer-placeholder");
  if (footTarget) {
    const base = isRoot ? "" : "../";
    footTarget.outerHTML = `
<footer id="footer">
  <div class="footer-top">
    <div class="footer-brand">
      <a class="nav-logo" href="${base}index.html">
        <img src="${isRoot ? "asset/logo.png" : "../asset/logo.png"}" alt="REO Travels Logo" style="height:60px;"/>
      </a>
      <p style="margin-top:12px;">Birthing Travel Dreams since 2022. Your premier gateway to extraordinary destinations across 30+ countries.</p>
      <div class="footer-socials">
        <a href="https://www.instagram.com/reo_travels?igsh=cHVzanJmNDMyM3k0&utm_source=qr" class="footer-social-icon" aria-label="Instagram"> <img src="asset/ig.png"/></a>
        <a href="https://www.facebook.com/share/185pypd2Cn/?mibextid=wwXIfr" class="footer-social-icon" aria-label="Facebook"><img src="asset/face.png"/></a>
        <a href="https://wa.me/2348172926565" target="_blank" class="footer-social-icon" aria-label="WhatsApp"><img src="asset/whatsapp.png"/></a>
        <a href="mailto:info@reotravelsandtours.org" class="footer-social-icon" aria-label="Email"><img src="asset/email.png"/></a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="services.html">Our Services</a></li>
        <li><a href="gallery.html">Gallery</a></li>
        <li><a href="blog.html">Travel Blog</a></li>
        <li><a href="about.html">Our Story</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="services.html">Visa Guidance</a></li>
        <li><a href="services.html">Flight Bookings</a></li>
        <li><a href="services.html">Hotel Reservations</a></li>
        <li><a href="services.html">Airport Transfers</a></li>
        <li><a href="services.html">Travel Insurance</a></li>
        <li><a href="services.html">Group Packages</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:+2348172926565">+234 817 292 6565</a></li>
        <li><a href="tel:+2348102850897">+234 810 285 0897</a></li>
        <li><a href="mailto:info@reotravelsandtours.org">info@reotravelsandtours.org</a></li>
        <li><a href="contact.html">Book a Consultation</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2025 REO Travels &amp; Tours. All rights reserved.</p>
    <div style="display:flex;gap:18px;flex-wrap:wrap;">
      <a href="privacy.html">Privacy Policy</a>
      <a href="terms.html">Terms &amp; Conditions</a>
    </div>
  </div>
</footer>`;
  }

  const waTarget = document.getElementById("wa-placeholder");
  if (waTarget) {
    waTarget.outerHTML = `<a href="https://wa.me/2348172926565?text=Hello%20REO%20Travels%20%26%20Tours%2C%20I%20want%20to%20make%20an%20enquiry" class="wa-float" target="_blank" aria-label="Chat on WhatsApp"></a>`;
  }

  const preTarget = document.getElementById("preloader-placeholder");
  if (preTarget) {
    preTarget.outerHTML = `
<div id="preloader">
  <div class="pre-logo"><img src="${logoPath}" alt="REO Travels"/></div>
  <div class="pre-track"><div class="pre-fill"></div></div>
  <p class="pre-text">Birthing Travel Dreams&hellip;</p>
</div>`;
  }
})();
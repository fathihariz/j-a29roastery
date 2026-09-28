const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "×" : "☰";
  });
}

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    }
  });
});

/* Scroll reveal */
const revealTargets = document.querySelectorAll(
  ".menu-section, .menu-card, .story, .visit-card, footer"
);
revealTargets.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry, index) => {
    if (!entry.isIntersecting) return;

    // Small stagger for menu cards.
    const delay = entry.target.classList.contains("menu-card")
      ? [...document.querySelectorAll(".menu-card")].indexOf(entry.target) * 100
      : 0;

    entry.target.style.transitionDelay = `${delay}ms`;
    entry.target.classList.add("visible");
    obs.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealTargets.forEach(el => observer.observe(el));

/* Subtle mouse-parallax for the hero illustration on desktop */
const hero = document.querySelector(".hero");
const art = document.querySelector(".hero-art");

if (hero && art && window.matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    art.style.setProperty("--mx", `${x * 10}px`);
    art.style.setProperty("--my", `${y * 7}px`);
  });

  hero.addEventListener("mouseleave", () => {
    art.style.setProperty("--mx", "0px");
    art.style.setProperty("--my", "0px");
  });
}

/* Ripple effect on buttons */
document.querySelectorAll(".btn, .header-cta").forEach(button => {
  button.addEventListener("click", function(event) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);

    ripple.style.position = "absolute";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255,255,255,.28)";
    ripple.style.transform = "scale(0)";
    ripple.style.pointerEvents = "none";
    ripple.style.animation = "ripple .55s ease-out forwards";

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
@keyframes ripple {
  to { transform: scale(1); opacity: 0; }
}
.hero-art {
  --mx: 0px;
  --my: 0px;
}
.hero-art .main-illustration {
  margin-left: var(--mx);
  margin-top: var(--my);
}
`;
document.head.appendChild(rippleStyle);

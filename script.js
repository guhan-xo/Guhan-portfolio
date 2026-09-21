const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const loadingScreen = document.getElementById("loadingScreen");

document.body.classList.add("is-loading");

window.setTimeout(() => {
  loadingScreen.classList.add("is-hidden");
  document.body.classList.remove("is-loading");
}, 3500);

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuBtn.textContent =
    navMenu.classList.contains("active")
      ? "✕"
      : "☰";
});

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const subject = `Portfolio message from ${formData.get("name")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    "",
    formData.get("message")
  ].join("\n");

  window.location.href = `mailto:guhananand2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const revealElements = document.querySelectorAll(
  ".section-heading, .skill-card, .project-card, .timeline-item, .cert-card"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});

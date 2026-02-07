// src/scripts/reveal.js
export const reveal = () => {
  const init = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // Pequeño retraso para asegurar que los componentes de Astro se hayan montado
    setTimeout(init, 100);
  }
};
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((otherItem) => {
      otherItem.classList.remove("open");
      otherItem
        .querySelector(".faq-question")
        .setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});

const rings = document.querySelectorAll(".meter-ring");

rings.forEach((ring) => {
  const level = Number(ring.dataset.level || 0);
  ring.style.background = `conic-gradient(#0e8a8a ${level * 3.6}deg, rgba(13,42,56,0.08) 0deg)`;
});

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

// Language switcher — navigate to /{lang}/ URL
const langSelect = document.getElementById("language-switcher");
if (langSelect) {
  // Set current value from URL
  const currentLang = window.i18n ? window.i18n.detectLang() : "en";
  langSelect.value = currentLang;

  langSelect.addEventListener("change", () => {
    const lang = langSelect.value;
    const pathname = window.location.pathname;
    // Strip any existing lang prefix
    const segments = pathname.split("/").filter(Boolean);
    const supportedLangs = window.i18n
      ? window.i18n.SUPPORTED_LANGS
      : ["en", "he", "es", "ru", "it"];
    let rest = segments;
    if (supportedLangs.includes(segments[0])) {
      rest = segments.slice(1);
    }
    const page = rest.join("/") || "";
    const newPath = lang === "en" ? `/${page}` : `/${lang}/${page}`;
    window.location.href = newPath + window.location.hash;
  });
}

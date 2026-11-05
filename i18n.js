/**
 * i18n — URL-path-based translation system.
 *
 * Language is determined by the first path segment:
 *   /he/        → Hebrew
 *   /es/quiz    → Spanish quiz
 *   /           → English (default)
 *
 * Works with both the Node rewrite server and plain static hosting.
 */

const SUPPORTED_LANGS = ["en", "he", "es", "ru", "it"];
const RTL_LANGS = ["he"];
const DEFAULT_LANG = "en";

/** Detect language from URL path */
function detectLang() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const first = (parts[0] || "").toLowerCase();
  if (SUPPORTED_LANGS.includes(first)) return first;
  return DEFAULT_LANG;
}

/** Return the base path prefix for the current language (e.g. "/he") */
function langPrefix() {
  const lang = detectLang();
  return lang === DEFAULT_LANG ? "" : `/${lang}`;
}

/** Rewrite internal links to include the language prefix */
function rewriteLinks() {
  const prefix = langPrefix();
  document.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    // Skip external, anchor-only, and javascript links
    if (
      !href ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("javascript")
    )
      return;
    // Already prefixed
    if (
      SUPPORTED_LANGS.some((l) => href.startsWith(`/${l}/`) || href === `/${l}`)
    )
      return;
    // Prefix the link
    const clean = href.startsWith("/") ? href : `/${href}`;
    a.setAttribute("href", `${prefix}${clean}`);
  });
}

/** Apply translations to all data-i18n elements */
function applyTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key] !== undefined) {
      el.textContent = translations[key];
    }
  });
}

/** Set document direction and lang attribute */
function applyDirection(lang) {
  const html = document.documentElement;
  html.setAttribute("lang", lang);
  if (RTL_LANGS.includes(lang)) {
    html.setAttribute("dir", "rtl");
    document.body.classList.add("rtl");
  } else {
    html.setAttribute("dir", "ltr");
    document.body.classList.remove("rtl");
  }
}

/** Load a language JSON file */
async function loadTranslations(lang) {
  if (lang === DEFAULT_LANG) return {}; // English is the inline default
  try {
    const resp = await fetch(`/lang/${lang}.json`);
    if (!resp.ok) return {};
    return resp.json();
  } catch {
    return {};
  }
}

/** Main init */
async function initI18n() {
  const lang = detectLang();
  applyDirection(lang);

  if (lang !== DEFAULT_LANG) {
    const translations = await loadTranslations(lang);
    applyTranslations(translations);
  }

  rewriteLinks();
}

// Auto-init on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initI18n);
} else {
  initI18n();
}

// Export for quiz.js to use
window.i18n = {
  detectLang,
  langPrefix,
  loadTranslations,
  applyTranslations,
  SUPPORTED_LANGS,
};

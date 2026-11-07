import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const SUPPORTED_LANGS = ["en", "he", "es", "ru", "it"];
export const DEFAULT_LANG = "en";
const RTL_LANGS = ["he"];

const loaders = import.meta.glob("../lang/*.json");

const I18nContext = createContext(null);

/** Language -> URL prefix, e.g. "he" -> "/he", "en" -> "" */
export const prefixFor = (lang) => (lang === DEFAULT_LANG ? "" : `/${lang}`);

export function I18nProvider({ lang, children }) {
  const [loaded, setLoaded] = useState({ lang: DEFAULT_LANG, messages: {} });

  useEffect(() => {
    let cancelled = false;
    if (lang === DEFAULT_LANG || !loaders[`../lang/${lang}.json`]) {
      setLoaded({ lang, messages: {} });
      return undefined;
    }
    loaders[`../lang/${lang}.json`]().then((mod) => {
      if (!cancelled) setLoaded({ lang, messages: mod.default });
    });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const ready = loaded.lang === lang;

  useEffect(() => {
    const rtl = RTL_LANGS.includes(lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", rtl ? "rtl" : "ltr");
    document.body.classList.toggle("rtl", rtl);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      prefix: prefixFor(lang),
      t: (key, fallback) => loaded.messages[key] || fallback,
    }),
    [lang, loaded],
  );

  if (!ready) return null;
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

/** Fill {name} placeholders in a string */
export function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    name in values ? values[name] : match,
  );
}

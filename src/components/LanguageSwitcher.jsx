import { useLocation, useNavigate } from "react-router-dom";
import { SUPPORTED_LANGS, prefixFor, useI18n } from "../i18n/I18nProvider";

const LABELS = {
  en: "English",
  es: "Español",
  he: "עברית",
  it: "Italiano",
  ru: "Русский",
};

export default function LanguageSwitcher() {
  const { lang, t } = useI18n();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  function change(event) {
    const next = event.target.value;
    const segments = pathname.split("/").filter(Boolean);
    const rest = SUPPORTED_LANGS.includes(segments[0])
      ? segments.slice(1)
      : segments;
    const target = `${prefixFor(next)}/${rest.join("/")}` || "/";
    navigate(target + hash);
  }

  return (
    <label className="language-wrap" htmlFor="language-switcher">
      <span className="sr-only">{t("footer.languageLabel", "Language")}</span>
      <select
        id="language-switcher"
        className="language-button"
        aria-label="Select language"
        value={lang}
        onChange={change}
      >
        {SUPPORTED_LANGS.map((code) => (
          <option key={code} value={code}>
            {LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}

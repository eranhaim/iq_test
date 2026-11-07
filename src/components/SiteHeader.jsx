import { useI18n } from "../i18n/I18nProvider";
import LocaleLink from "./LocaleLink";

export default function SiteHeader() {
  const { t } = useI18n();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <LocaleLink to="/" className="brand" aria-label="Home">
          <img
            className="brand-logo"
            src="/assets/logo.svg"
            alt=""
            width="28"
            height="28"
          />{" "}
          <span className="brand-text">yourIQ</span>
        </LocaleLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#how-it-works">{t("nav.how", "How it works")}</a>
          <a href="#reviews">{t("nav.reviews", "Reviews")}</a>
          <a href="#pricing">{t("nav.pricing", "Pricing")}</a>
        </nav>
        <div className="nav-actions">
          <a href="#" className="link-btn">
            {t("nav.login", "Log in")}
          </a>
          <LocaleLink to="/quiz" className="btn btn-primary">
            {t("nav.start", "Start Test")}
          </LocaleLink>
        </div>
      </div>
    </header>
  );
}

import { useI18n } from "../i18n/I18nProvider";
import LocaleLink from "./LocaleLink";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <LocaleLink to="/" className="brand footer-brand">
            <img
              className="brand-logo"
              src="/assets/logo.svg"
              alt=""
              width="28"
              height="28"
            />{" "}
            <span className="brand-text">yourIQ</span>
          </LocaleLink>
          <div className="socials" aria-label="Social media links">
            <a href="#" aria-label="Instagram">
              ◎
            </a>
            <a href="#" aria-label="Facebook">
              ◍
            </a>
            <a href="#" aria-label="Reddit">
              ◌
            </a>
          </div>
          <a href="#" className="text-link verify-link">
            {t("footer.verify", "Verify your results")}
          </a>
        </div>
        <div className="footer-column">
          <h3>{t("footer.product", "Product")}</h3>
          <ul>
            <li>
              <a href="#how-it-works">{t("nav.how", "How it works")}</a>
            </li>
            <li>
              <a href="#">{t("footer.courses", "Courses")}</a>
            </li>
            <li>
              <a href="#reviews">{t("nav.reviews", "Reviews")}</a>
            </li>
            <li>
              <a href="#pricing">{t("nav.pricing", "Pricing")}</a>
            </li>
            <li>
              <a href="#faq">{t("footer.faq", "FAQ")}</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>{t("footer.support", "Support")}</h3>
          <ul>
            <li>
              <a href="#">{t("footer.help", "Help")}</a>
            </li>
            <li>
              <a href="#">{t("footer.cancel", "How to cancel")}</a>
            </li>
            <li>
              <a href="#">{t("footer.contact", "Contact")}</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>{t("footer.legal", "Legal")}</h3>
          <ul>
            <li>
              <a href="#">{t("footer.privacy", "Privacy Policy")}</a>
            </li>
            <li>
              <a href="#">{t("footer.terms", "Terms of Service")}</a>
            </li>
            <li>
              <a href="#">{t("footer.cookies", "Cookie Policy")}</a>
            </li>
            <li>
              <a href="#">{t("footer.refund", "Refund Policy")}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom container">
        <div className="legal-copy">
          <p>
            {t(
              "footer.legalText1",
              "Copyright © 2024-2026 yourIQ™. 2093 Philadelphia Pike #3129, Claymont, DE 19703, United States.",
            )}
          </p>
          <p>
            {t(
              "footer.legalText2",
              "The test is for entertainment or educational purposes only and is not a substitute for professional evaluation.",
            )}
          </p>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}

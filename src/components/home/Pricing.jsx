import { useI18n } from "../../i18n/I18nProvider";
import LocaleLink from "../../components/LocaleLink";

export default function Pricing() {
  const { t } = useI18n();

  return (
    <section id="pricing" className="pricing-section container">
      <div className="pricing-copy">
        <h2>{t("pricing.title", "Everything you need in one plan.")}</h2>
        <p>
          {t(
            "pricing.subtitle",
            "Start with a 7-day trial and get full access. Cancel anytime.",
          )}
        </p>
        <ul className="check-list compact">
          <li>
            {t("pricing.item1", "Detailed IQ score and results breakdown")}
          </li>
          <li>{t("pricing.item2", "Complete cognitive profile")}</li>
          <li>
            {t(
              "pricing.item3",
              "Additional assessments for deeper personal insights",
            )}
          </li>
          <li>{t("pricing.item4", "17 courses with 35+ hours of lessons")}</li>
          <li>
            {t("pricing.item5", "Brain training games with 150+ exercises")}
          </li>
          <li>{t("pricing.item6", "Shareable certificate")}</li>
        </ul>
      </div>
      <div className="pricing-card">
        <div className="card-tag">{t("pricing.cardtag", "Membership")}</div>
        <div className="price-row">
          <div>
            <span>{t("pricing.today", "Today")}</span>
            <strong>$1.00</strong>
            <small>{t("pricing.trial", "7-day trial")}</small>
          </div>
          <div>
            <span>{t("pricing.then", "Then")}</span>
            <strong>$29.99</strong>
            <small>{t("pricing.period", "every 28 days")}</small>
          </div>
        </div>
        <LocaleLink to="/quiz" className="btn btn-primary full">
          {t("pricing.cta", "Start My IQ Test")}
        </LocaleLink>
        <p>
          {t(
            "pricing.note",
            "Your $1.00 trial lasts 7 days. Unless you cancel before it ends, your subscription renews automatically at $29.99 every 28 days.",
          )}
        </p>
      </div>
    </section>
  );
}

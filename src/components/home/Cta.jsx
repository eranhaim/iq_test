import { useI18n } from "../../i18n/I18nProvider";
import LocaleLink from "../../components/LocaleLink";

export default function Cta() {
  const { t } = useI18n();

  return (
    <section className="cta container">
      <div className="cta-inner">
        <div className="cta-copy">
          <h2>{t("cta.title", "Ready to find your IQ Score?")}</h2>
          <p>
            {t(
              "cta.subtitle",
              "40 questions. Up to 20 minutes. Your full profile at the end.",
            )}
          </p>
        </div>
        <LocaleLink to="/quiz" className="btn btn-primary large">
          {t("cta.button", "Start My IQ Test")}
        </LocaleLink>
      </div>
      <p className="cta-note">
        {t("cta.note", "Auto-renewing subscription. Cancel anytime.")}
      </p>
    </section>
  );
}

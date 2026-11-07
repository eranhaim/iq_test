import { useI18n } from "../../i18n/I18nProvider";

export default function HowItWorks() {
  const { t } = useI18n();

  return (
    <section id="how-it-works" className="content-section container">
      <div className="section-header centered">
        <h2>
          {t("how.title", "Discover your IQ score in three simple steps.")}
        </h2>
        <p>
          {t(
            "how.subtitle",
            "Complete the test, get your results, and understand your strengths.",
          )}
        </p>
      </div>
      <div className="steps-grid">
        <article className="step-card">
          <div className="step-illustration step-q">?</div>
          <div className="step-num">01</div>
          <h3>{t("step1.title", "Complete the test")}</h3>
          <p>
            {t(
              "step1.text",
              "Answer 40 progressively challenging questions inspired by Raven’s Progressive Matrices in 20 minutes or less.",
            )}
          </p>
        </article>
        <article className="step-card">
          <div className="mini-score-card">
            <div className="mini-score-top">
              <span className="mini-number">120</span>
              <span className="mini-label">{t("score.label", "IQ score")}</span>
            </div>
          </div>
          <div className="step-num">02</div>
          <h3>{t("step2.title", "Get your IQ score")}</h3>
          <p>
            {t(
              "step2.text",
              "See your estimated IQ score, percentile rank, and a detailed breakdown of your answers.",
            )}
          </p>
        </article>
        <article className="step-card">
          <div className="profile-pills">
            <span>{t("profile.label", "Cognitive profile")}</span>
          </div>
          <div className="step-num">03</div>
          <h3>{t("step3.title", "Understand your strengths")}</h3>
          <p>
            {t(
              "step3.text",
              "Explore your cognitive profile, download your certificate, and improve with over 150 training exercises.",
            )}
          </p>
        </article>
      </div>
    </section>
  );
}

import { useI18n } from "../../i18n/I18nProvider";
import LocaleLink from "../../components/LocaleLink";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero container">
      <div className="hero-copy">
        <h1>{t("hero.title", "Know your IQ. Know yourself better.")}</h1>
        <p>
          {t(
            "hero.subtitle",
            "Complete 40 questions on patterns, numbers, logic, and memory to get your IQ score and cognitive profile.",
          )}
        </p>
        <LocaleLink to="/quiz" className="btn btn-primary large">
          {t("hero.cta", "Start My IQ Test")}
        </LocaleLink>
        <div
          className="trust-row"
          aria-label="Customer rating and review summary"
        >
          <div className="stars" aria-hidden="true">
            ★★★★★
          </div>
          <span>{t("hero.rated", "Rated 4.1 / 5 from 151,263 reviews.")}</span>
          <span className="trustpilot">
            {t("hero.trustpilot", "Trustpilot")}
          </span>
        </div>
      </div>
      <div className="hero-visual" aria-label="IQ result card">
        <div className="result-card">
          <div className="result-header">Your result</div>
          <div className="score-line">
            <span className="score">120</span>
            <span className="score-label">IQ score</span>
          </div>
          <svg
            className="curve-svg"
            viewBox="0 0 420 150"
            role="img"
            aria-label="IQ distribution curve with marker at 120"
          >
            <path
              d="M0,120 C40,120 80,110 100,94 C120,76 135,62 165,60 C210,56 275,90 310,90 C350,90 385,80 420,70 L420,150 L0,150 Z"
              fill="rgba(52, 118, 171, 0.12)"
            />
            <path
              d="M0,118 C40,118 80,109 100,93 C120,76 135,62 165,60 C210,56 275,89 310,89 C350,89 385,79 420,68"
              fill="none"
              stroke="#3e8fd8"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="300" cy="89" r="6" fill="#3e8fd8" />
            <path
              d="M300 80 L300 100 M290 89 L310 89"
              stroke="#3e8fd8"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <div className="result-meta">
            <span>40 questions · Up to 20 minutes</span>
            <span>Detailed results</span>
          </div>
        </div>
      </div>
    </section>
  );
}

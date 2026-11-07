import { useI18n } from "../../i18n/I18nProvider";

export default function Insights() {
  const { t } = useI18n();

  return (
    <section className="insights container">
      <div className="insight-copy">
        <h2>{t("insights.title", "See what your score really means.")}</h2>
        <p>
          {t(
            "insights.subtitle",
            "Discover where you stand, how you compare, and what your score means.",
          )}
        </p>
        <ul className="check-list">
          <li>
            {t("insights.item1", "Your IQ score on the distribution curve")}
          </li>
          <li>
            {t("insights.item2", "Your percentile among other test takers")}
          </li>
          <li>
            {t("insights.item3", "A plain-English explanation of your result")}
          </li>
          <li>{t("insights.item4", "A detailed review of all 40 answers")}</li>
        </ul>
      </div>
      <div className="score-panel">
        <div className="panel-heading">
          {t("report.title", "Your cognitive report")}
        </div>
        <div className="distribution-visual">
          <div className="curve-area">
            <div className="curve-line"></div>
            <div className="marker-dot"></div>
          </div>
          <div className="score-scale">
            <span>70</span>
            <span>100</span>
            <span>130</span>
          </div>
        </div>
        <div className="stats-row">
          <div>
            <span className="muted">{t("report.better", "Better than")}</span>
            <strong>91%</strong>
          </div>
          <div>
            <span className="muted">{t("report.score", "Your IQ score")}</span>
            <strong>120</strong>
          </div>
          <div>
            <span className="muted">
              {t("report.above", "Points above average")}
            </span>
            <strong>+20</strong>
          </div>
        </div>
        <p className="fine-print">
          {t(
            "report.note",
            "Scores follow a normal distribution: average 100, standard deviation 15.",
          )}
        </p>
      </div>
    </section>
  );
}

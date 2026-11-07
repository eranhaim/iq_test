import { useI18n } from "../../i18n/I18nProvider";

export default function Ranking() {
  const { t } = useI18n();

  return (
    <section className="ranking container">
      <div className="rank-copy">
        <h2>{t("ranking.title", "Where you stand.")}</h2>
        <p>
          {t(
            "ranking.subtitle",
            "See how you rank among millions of test takers.",
          )}
        </p>
        <ul className="check-list">
          <li>
            {t(
              "ranking.item1",
              "Your rank, shown as the share of test takers you scored above",
            )}
          </li>
          <li>
            {t(
              "ranking.item2",
              "Where that places you in a room of 100 people",
            )}
          </li>
          <li>
            {t(
              "ranking.item3",
              "The same score, compared worldwide and within your own country",
            )}
          </li>
        </ul>
      </div>
      <div className="rank-panel">
        <div className="panel-heading">
          {t("ranking.panel", "Your ranking")}
        </div>
        <div className="rank-blocks">
          <div>
            <span>{t("ranking.worldwide", "Worldwide")}</span>
            <strong>Top 9%</strong>
          </div>
          <div>
            <span>{t("ranking.country", "Germany")}</span>
            <strong>Top 10%</strong>
          </div>
        </div>
        <p>
          {t(
            "ranking.result",
            "You scored higher than 91% of yourIQ test takers.",
          )}
        </p>
        <p className="fine-print">
          {t(
            "ranking.note",
            "Based on yourIQ test takers, not the general population.",
          )}
        </p>
      </div>
    </section>
  );
}

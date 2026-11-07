import { useI18n } from "../../i18n/I18nProvider";

export default function StatsBand() {
  const { t } = useI18n();

  return (
    <section className="stats-band">
      <div className="container stats-grid">
        <div className="stat-item">
          <div className="stat-number">80M+</div>
          <div className="stat-label">
            {t("stats.takers", "Test takers worldwide")}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-number">107</div>
          <div className="stat-label">
            {t("stats.avg", "Average IQ score today")}
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-number">150+</div>
          <div className="stat-label">
            {t("stats.training", "Cognitive training exercises")}
          </div>
        </div>
      </div>
    </section>
  );
}

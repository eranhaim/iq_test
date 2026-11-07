import { useI18n } from "../../i18n/I18nProvider";

export default function Training() {
  const { t } = useI18n();

  return (
    <section className="content-section container training-wrap">
      <div className="training-copy">
        <h2>{t("training.title", "Training built on your results.")}</h2>
        <p>
          {t(
            "training.subtitle",
            "Short exercises for reasoning, memory and processing speed, matched to your cognitive profile.",
          )}
        </p>
        <ul className="check-list compact">
          <li>{t("training.item1", "3 exercises a day, 10 minutes total")}</li>
          <li>
            {t("training.item2", "Brain training games and 150+ exercises")}
          </li>
          <li>{t("training.item3", "Retakes whenever you want")}</li>
        </ul>
      </div>
      <div className="training-panel">
        <div className="panel-heading">
          {t("training.panel", "Your first session")}
        </div>
        <ul className="session-list">
          <li>
            <span className="session-badge"></span>
            <div>
              <strong>Pattern Logic</strong>
              <small>Fluid reasoning</small>
            </div>
            <time>4 min</time>
          </li>
          <li>
            <span className="session-badge alt"></span>
            <div>
              <strong>Memory Grid</strong>
              <small>Working memory</small>
            </div>
            <time>3 min</time>
          </li>
          <li>
            <span className="session-badge soft"></span>
            <div>
              <strong>Focus Sprint</strong>
              <small>Processing speed</small>
            </div>
            <time>3 min</time>
          </li>
        </ul>
        <p>A sample of your first session; exercises adapt to your profile.</p>
      </div>
    </section>
  );
}

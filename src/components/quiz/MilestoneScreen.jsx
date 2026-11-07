import { fill, useI18n } from "../../i18n/I18nProvider";

export default function MilestoneScreen({ step, answered, total, onNext }) {
  const { t } = useI18n();
  const percent = Math.round((answered / total) * 100);
  const values = { percent, left: total - answered };
  const subtitle = t(`quiz.${step.id}.subtitle`, step.subtitle);

  return (
    <section className="milestone-panel">
      <div
        className="progress-ring"
        style={{ "--percent": `${percent}%` }}
        aria-hidden="true"
      >
        <div className="progress-ring-inner">
          <span>{percent}%</span>
        </div>
      </div>
      <div className="milestone-copy">
        <h1>{t(`quiz.${step.id}.title`, step.title)}</h1>
        {subtitle && <h2>{fill(subtitle, values)}</h2>}
        <p>
          {fill(t(`quiz.${step.id}.description`, step.description), values)}
        </p>
      </div>
      <button
        className="primary-btn milestone-btn"
        type="button"
        onClick={onNext}
      >
        {t("quiz.continue", "Continue")}
      </button>
    </section>
  );
}

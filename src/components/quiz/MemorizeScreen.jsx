import { useI18n } from "../../i18n/I18nProvider";
import DigitTiles from "./DigitTiles";

export default function MemorizeScreen({ step, onNext }) {
  const { t } = useI18n();
  return (
    <section className="memorize-panel">
      <div className="memorize-card">
        <h1 className="memorize-label">
          {t(`quiz.${step.id}.title`, step.title)}
        </h1>
        <p className="note">{t(`quiz.${step.id}.note`, step.note)}</p>
        {step.digits ? (
          <div className="digit-panel">
            <DigitTiles digits={step.digits} />
          </div>
        ) : (
          <div className="memorize-word">
            {t(`quiz.${step.id}.word`, step.word)}
          </div>
        )}
        <p className="continue-note">
          {t("quiz.continue_note", "Continue whenever you're ready")}
        </p>
        <button
          className="primary-btn memorize-btn"
          type="button"
          onClick={onNext}
        >
          {t("quiz.memorize_btn", "I've memorized it")}
        </button>
      </div>
    </section>
  );
}

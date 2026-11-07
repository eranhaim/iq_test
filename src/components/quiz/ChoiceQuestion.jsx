import { useI18n } from "../../i18n/I18nProvider";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function ChoiceQuestion({ step, onAnswer }) {
  const { t } = useI18n();

  return (
    <section className="question-panel">
      <h1 className="question-title">
        {t(`quiz.${step.id}.text`, step.text)}
        {step.sequence && (
          <>
            {" "}
            <bdi dir="ltr" className="sequence">
              {step.sequence}
            </bdi>
          </>
        )}
      </h1>
      <div className="answer-list">
        {step.options.map((option, index) => {
          const key = step.likert
            ? `quiz.likert.${index}`
            : `quiz.${step.id}.o${index}`;
          return (
            <button
              key={index}
              className={`option-btn${step.likert ? ` likert-${index}` : ""}`}
              type="button"
              onClick={() => onAnswer(step.id, index)}
            >
              {!step.likert && (
                <span className="option-letter" aria-hidden="true">
                  {OPTION_LETTERS[index]}
                </span>
              )}
              <span className="option-label">
                <bdi>{t(key, option)}</bdi>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

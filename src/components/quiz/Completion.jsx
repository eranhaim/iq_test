import LocaleLink from "../LocaleLink";
import { fill, useI18n } from "../../i18n/I18nProvider";

export default function Completion({ questions, answers }) {
  const { t } = useI18n();
  const scored = questions.filter((step) => step.correct !== null);
  const correct = scored.filter((s) => answers[s.id] === s.correct).length;

  return (
    <section className="completion-panel">
      <div className="completion-card">
        <h1>{t("quiz.completion_title", "Your IQ profile is ready.")}</h1>
        <p>
          {fill(
            t(
              "quiz.score",
              "You answered {correct} of {total} questions correctly.",
            ),
            { correct, total: scored.length },
          )}
        </p>
        <LocaleLink className="primary-btn" to="/">
          {t("quiz.return_home", "Return Home")}
        </LocaleLink>
      </div>
    </section>
  );
}

import { useI18n } from "../../i18n/I18nProvider";

export default function PuzzleLayout({ stage, children }) {
  const { t } = useI18n();
  return (
    <section className="split-question" dir="ltr">
      <div className="puzzle-stage">{stage}</div>
      <div className="puzzle-answers">
        <p className="puzzle-prompt" dir="auto">
          {t("quiz.choose_answer", "Choose your answer:")}
        </p>
        <div className="puzzle-options">{children}</div>
      </div>
    </section>
  );
}

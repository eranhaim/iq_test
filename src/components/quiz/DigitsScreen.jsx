import { useEffect, useRef, useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";
import DigitTiles from "./DigitTiles";

const DIGIT_SECONDS = 5;

/** Shows digits briefly, then moves on to the recall question */
export default function DigitsScreen({ step, onNext }) {
  const { t } = useI18n();
  const [remaining, setRemaining] = useState(DIGIT_SECONDS);
  const onNextRef = useRef(onNext);
  onNextRef.current = onNext;

  useEffect(() => {
    const id = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (remaining <= 0) onNextRef.current();
  }, [remaining]);

  // Split the translated sentence around {seconds} so the number can be bold
  const [before, after = ""] = t(
    "quiz.digits_countdown",
    "Disappears in {seconds} seconds",
  ).split("{seconds}");

  return (
    <section className="memorize-panel">
      <div className="memorize-card">
        <h1 className="memorize-label">
          {t("quiz.digits_title", "Memorize this number sequence")}
        </h1>
        <div className="digit-panel">
          <DigitTiles digits={step.digits} />
          <div className="digit-bar">
            <span style={{ animationDuration: `${DIGIT_SECONDS}s` }} />
          </div>
        </div>
        <p className="digit-countdown">
          {before}
          <strong>{Math.max(remaining, 0)}</strong>
          {after}
        </p>
      </div>
    </section>
  );
}

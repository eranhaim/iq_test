import { useEffect, useState } from "react";
import LocaleLink from "../components/LocaleLink";
import { fill, useI18n } from "../i18n/I18nProvider";
import { quizFlow } from "../quiz/quizData";
import ChoiceQuestion from "../components/quiz/ChoiceQuestion";
import PictureQuestion from "../components/quiz/PictureQuestion";
import NumberGridQuestion from "../components/quiz/NumberGridQuestion";
import MemorizeScreen from "../components/quiz/MemorizeScreen";
import DigitsScreen from "../components/quiz/DigitsScreen";
import MilestoneScreen from "../components/quiz/MilestoneScreen";
import Completion from "../components/quiz/Completion";

const questions = quizFlow.filter((step) => step.type === "question");

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function answeredBefore(stepIndex) {
  return quizFlow.slice(0, stepIndex).filter((s) => s.type === "question")
    .length;
}

export default function Quiz() {
  const { t } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [answers, setAnswers] = useState({});

  const step = quizFlow[stepIndex];
  const finished = !step;

  useEffect(() => {
    document.title = "yourIQ Quiz";
    document.body.classList.add("quiz-body");
    return () => document.body.classList.remove("quiz-body");
  }, []);

  useEffect(() => {
    if (finished) return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  const next = () => setStepIndex((i) => i + 1);
  const answer = (id, index) => {
    setAnswers((prev) => ({ ...prev, [id]: index }));
    next();
  };

  const answered = answeredBefore(stepIndex);
  const progress = Math.min((answered / questions.length) * 100, 100);
  const counterValue = Math.min(
    step && step.type === "question" ? answered + 1 : answered,
    questions.length,
  );
  const wide = step && (step.picture || step.grid);

  let screen = null;
  if (finished) {
    screen = <Completion questions={questions} answers={answers} />;
  } else if (step.type === "memorize") {
    screen = <MemorizeScreen key={step.id} step={step} onNext={next} />;
  } else if (step.type === "digits") {
    screen = <DigitsScreen key={stepIndex} step={step} onNext={next} />;
  } else if (step.type === "milestone") {
    screen = (
      <MilestoneScreen
        key={step.id}
        step={step}
        answered={answered}
        total={questions.length}
        onNext={next}
      />
    );
  } else if (step.picture) {
    screen = <PictureQuestion key={step.id} step={step} onAnswer={answer} />;
  } else if (step.grid) {
    screen = <NumberGridQuestion key={step.id} step={step} onAnswer={answer} />;
  } else {
    screen = <ChoiceQuestion key={step.id} step={step} onAnswer={answer} />;
  }

  return (
    <>
      <header className="quiz-header">
        <div className="quiz-header-inner container">
          <LocaleLink to="/" className="brand quiz-brand" aria-label="Home">
            <img
              className="brand-logo"
              src="/assets/logo.svg"
              alt=""
              width="28"
              height="28"
            />
            <span className="brand-text">yourIQ</span>
          </LocaleLink>

          <div className="quiz-meta">
            <div className="quiz-counter">
              {fill(t("quiz.counter", "{current} of {total}"), {
                current: counterValue,
                total: questions.length,
              })}
            </div>
            <div className="quiz-timer" aria-live="polite">
              {formatTime(seconds)}
            </div>
          </div>
        </div>

        <div className="progress-track" aria-label="Test progress">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="quiz-main">
        <div
          className={`quiz-screen${wide ? " quiz-screen-wide" : ""}`}
          aria-live="polite"
        >
          {screen}
        </div>
      </main>
    </>
  );
}

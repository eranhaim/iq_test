const DIGIT_SECONDS = 5;
const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
const PICTURE_OPTION_FILES = [1, 2, 3, 4, 5, 6];

const screenRoot = document.getElementById("quizScreen");
const progressFill = document.getElementById("progressFill");
const timerNode = document.getElementById("quizTimer");
const counterNode = document.getElementById("quizCounter");

const questions = quizFlow.filter((step) => step.type === "question");

let currentStep = 0;
let seconds = 0;
let timerInterval = null;
let digitInterval = null;
let quizTranslations = {};
const answers = {};

/** Get translated quiz text or fall back to English */
function t(key, fallback) {
  return quizTranslations[key] || fallback;
}

/** Fill {name} placeholders in a string */
function fill(text, values) {
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    name in values ? values[name] : match,
  );
}

function formatTime(totalSeconds) {
  const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const secs = String(totalSeconds % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateTimer() {
  timerNode.textContent = formatTime(seconds);
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds += 1;
    updateTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function answeredCount() {
  return quizFlow.slice(0, currentStep).filter((s) => s.type === "question")
    .length;
}

function updateCounter() {
  const step = quizFlow[currentStep];
  const done = answeredCount();
  const current = step && step.type === "question" ? done + 1 : done;
  counterNode.textContent = fill(t("quiz.counter", "{current} of {total}"), {
    current: Math.min(current, questions.length),
    total: questions.length,
  });
}

function updateProgress() {
  updateCounter();
  const progress = (answeredCount() / questions.length) * 100;
  progressFill.style.width = `${Math.min(progress, 100)}%`;
}

function next() {
  currentStep += 1;
  render();
}

function digitTiles(digits) {
  return `<div class="digit-tiles" dir="ltr">${digits
    .map((digit) => `<span class="digit-tile">${digit}</span>`)
    .join("")}</div>`;
}

function renderMemorize() {
  const step = quizFlow[currentStep];
  const body = step.digits
    ? `<div class="digit-panel">${digitTiles(step.digits)}</div>`
    : `<div class="memorize-word">${t(`quiz.${step.id}.word`, step.word)}</div>`;

  screenRoot.innerHTML = `
    <section class="memorize-panel">
      <div class="memorize-card">
        <h1 class="memorize-label">${t(`quiz.${step.id}.title`, step.title)}</h1>
        <p class="note">${t(`quiz.${step.id}.note`, step.note)}</p>
        ${body}
        <p class="continue-note">${t("quiz.continue_note", "Continue whenever you're ready")}</p>
        <button class="primary-btn memorize-btn" type="button">${t("quiz.memorize_btn", "I've memorized it")}</button>
      </div>
    </section>
  `;

  document.querySelector(".memorize-btn").addEventListener("click", next);
}

/** Show digits briefly, then move on to the recall question */
function renderDigits() {
  const step = quizFlow[currentStep];
  let remaining = DIGIT_SECONDS;
  const countdownText = () =>
    fill(t("quiz.digits_countdown", "Disappears in {seconds} seconds"), {
      seconds: `<strong>${remaining}</strong>`,
    });

  screenRoot.innerHTML = `
    <section class="memorize-panel">
      <div class="memorize-card">
        <h1 class="memorize-label">${t("quiz.digits_title", "Memorize this number sequence")}</h1>
        <div class="digit-panel">
          ${digitTiles(step.digits)}
          <div class="digit-bar"><span style="animation-duration:${DIGIT_SECONDS}s"></span></div>
        </div>
        <p class="digit-countdown">${countdownText()}</p>
      </div>
    </section>
  `;

  const countdown = document.querySelector(".digit-countdown");
  digitInterval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(digitInterval);
      next();
      return;
    }
    countdown.innerHTML = countdownText();
  }, 1000);
}

function renderMilestone() {
  const step = quizFlow[currentStep];
  const answered = answeredCount();
  const percent = Math.round((answered / questions.length) * 100);
  const values = { percent, left: questions.length - answered };
  const subtitle = t(`quiz.${step.id}.subtitle`, step.subtitle);

  screenRoot.innerHTML = `
    <section class="milestone-panel">
      <div class="progress-ring" style="--percent:${percent}%" aria-hidden="true">
        <div class="progress-ring-inner"><span>${percent}%</span></div>
      </div>
      <div class="milestone-copy">
        <h1>${t(`quiz.${step.id}.title`, step.title)}</h1>
        ${subtitle ? `<h2>${fill(subtitle, values)}</h2>` : ""}
        <p>${fill(t(`quiz.${step.id}.description`, step.description), values)}</p>
      </div>
      <button class="primary-btn milestone-btn" type="button">${t("quiz.continue", "Continue")}</button>
    </section>
  `;

  document.querySelector(".milestone-btn").addEventListener("click", next);
}

/** Inline stand-in shown until the real SVG is added */
function placeholderSvg(label, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8 6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.round(height / 5)}" fill="#64748b">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function pictureImage(src, label, width, height) {
  const fallback = placeholderSvg(label, width, height);
  return `<img src="${src}" alt="" onerror="this.onerror=null;this.src='${fallback}'" />`;
}

function selectAnswer(step, index, button) {
  document
    .querySelectorAll("[data-index]")
    .forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");
  answers[step.id] = index;
  setTimeout(next, 420);
}

function bindAnswers(step) {
  document.querySelectorAll("[data-index]").forEach((button) => {
    button.addEventListener("click", () =>
      selectAnswer(step, Number(button.dataset.index), button),
    );
  });
}

function renderChoice(step) {
  const heading = t(`quiz.${step.id}.text`, step.text);
  const sequence = step.sequence
    ? ` <bdi dir="ltr" class="sequence">${step.sequence}</bdi>`
    : "";

  const options = step.options
    .map((option, index) => {
      const key = step.likert
        ? `quiz.likert.${index}`
        : `quiz.${step.id}.o${index}`;
      const letter = step.likert
        ? ""
        : `<span class="option-letter" aria-hidden="true">${OPTION_LETTERS[index]}</span>`;
      return `
        <button class="option-btn${step.likert ? ` likert-${index}` : ""}" data-index="${index}" type="button">
          ${letter}
          <span class="option-label"><bdi>${t(key, option)}</bdi></span>
        </button>`;
    })
    .join("");

  screenRoot.innerHTML = `
    <section class="question-panel">
      <h1 class="question-title">${heading}${sequence}</h1>
      <div class="answer-list">${options}</div>
    </section>
  `;
  bindAnswers(step);
}

function renderSplit(step, stage, optionTiles) {
  screenRoot.innerHTML = `
    <section class="split-question" dir="ltr">
      <div class="puzzle-stage">${stage}</div>
      <div class="puzzle-answers">
        <p class="puzzle-prompt" dir="auto">${t("quiz.choose_answer", "Choose your answer:")}</p>
        <div class="puzzle-options">${optionTiles}</div>
      </div>
    </section>
  `;
  bindAnswers(step);
}

function renderPicture(step) {
  const base = `/assets/quiz/${step.id}`;
  const stage = pictureImage(
    `${base}/question.svg`,
    step.id.toUpperCase(),
    600,
    450,
  );
  const tiles = (step.optionFiles || PICTURE_OPTION_FILES)
    .map((file, index) => {
      const letter = OPTION_LETTERS[index];
      return `
        <button class="puzzle-option" data-index="${index}" type="button" aria-label="${letter}">
          ${pictureImage(`${base}/option-${file}.svg`, letter, 200, 120)}
        </button>`;
    })
    .join("");
  renderSplit(step, stage, tiles);
}

function renderNumberGrid(step) {
  const cells = step.grid
    .map((value) => `<span class="grid-cell">${value}</span>`)
    .join("");
  const stage = `<div class="number-grid">${cells}<span class="grid-cell grid-unknown">?</span></div>`;
  const tiles = step.options
    .map(
      (option, index) => `
        <button class="puzzle-option puzzle-option-text" data-index="${index}" type="button">${option}</button>`,
    )
    .join("");
  renderSplit(step, stage, tiles);
}

function renderQuestion() {
  const step = quizFlow[currentStep];
  if (step.picture) renderPicture(step);
  else if (step.grid) renderNumberGrid(step);
  else renderChoice(step);
}

function renderCompletion() {
  const homeHref =
    (window.i18n ? window.i18n.langPrefix() : "") + "/index.html";
  const scored = questions.filter((step) => step.correct !== null);
  const correct = scored.filter((s) => answers[s.id] === s.correct).length;

  screenRoot.innerHTML = `
    <section class="completion-panel">
      <div class="completion-card">
        <h1>${t("quiz.completion_title", "Your IQ profile is ready.")}</h1>
        <p>${fill(t("quiz.score", "You answered {correct} of {total} questions correctly."), { correct, total: scored.length })}</p>
        <a class="primary-btn" href="${homeHref}">${t("quiz.return_home", "Return Home")}</a>
      </div>
    </section>
  `;
  stopTimer();
}

function render() {
  const step = quizFlow[currentStep];
  const wide = step && (step.picture || step.grid);
  screenRoot.classList.toggle("quiz-screen-wide", Boolean(wide));
  updateProgress();

  if (!step) {
    renderCompletion();
    return;
  }

  switch (step.type) {
    case "memorize":
      renderMemorize();
      break;
    case "digits":
      renderDigits();
      break;
    case "question":
      renderQuestion();
      break;
    case "milestone":
      renderMilestone();
      break;
    default:
      break;
  }
}

/** Initialize quiz — load translations then start */
async function initQuiz() {
  if (window.i18n) {
    const lang = window.i18n.detectLang();
    if (lang !== "en") {
      quizTranslations = await window.i18n.loadTranslations(lang);
    }
  }
  startTimer();
  render();
}

initQuiz();

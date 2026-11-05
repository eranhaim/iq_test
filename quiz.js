const quizFlow = [
  {
    type: "memorize",
    word: "Cognitive",
    note: "You will be asked about it during the quiz",
  },
  {
    type: "question",
    number: 1,
    question: "A farmer has 15 sheep. All but 8 die. How many are left?",
    options: ["A 7", "B 8", "C 15", "D 0", "E 3"],
    correct: "B 8",
  },
  {
    type: "question",
    number: 2,
    question: "You pass the person in 3rd place. What place are you?",
    options: ["A 1", "B 4", "C 3", "D 2", "E 5"],
    correct: "D 2",
  },
  {
    type: "question",
    number: 3,
    question: "How many corners does a cube have?",
    options: ["A 6", "B 4", "C 8", "D 5", "E 7"],
    correct: "A 6",
  },
  {
    type: "question",
    number: 4,
    question: "I prefer learning through hands-on experience",
    options: [
      "Strongly Agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly Disagree",
    ],
    correct: "Neutral",
  },
  {
    type: "question",
    number: 5,
    question: "What number comes next in this pattern? 2, 4, 8, 16, ___",
    options: ["A 20", "B 24", "C 30", "D 32", "E 36"],
    correct: "D 32",
  },
  {
    type: "question",
    number: 6,
    question: "What number is missing? 3, 6, 9, 12, ___, 18",
    options: ["A 13", "B 14", "C 15", "D 16", "E 17"],
    correct: "C 15",
  },
  {
    type: "question",
    number: 7,
    question: "Memorize this number sequence",
    options: ["7", "3", "8", "5"],
    memorize: true,
    memorizeNumbers: "7 3 8 5",
    correct: "7",
  },
  {
    type: "question",
    number: 8,
    question: "Memorize this number sequence",
    options: ["4", "9", "2", "6", "1"],
    memorize: true,
    memorizeNumbers: "4 9 2 6 1",
    correct: "4",
  },
  {
    type: "question",
    number: 9,
    question: "Memorize this number sequence",
    options: ["3", "8", "5", "1", "7", "4"],
    memorize: true,
    memorizeNumbers: "3 8 5 1 7 4",
    correct: "3",
  },
  {
    type: "question",
    number: 10,
    question: "I easily visualize 3D objects in my mind",
    options: [
      "Strongly Agree",
      "Agree",
      "Neutral",
      "Disagree",
      "Strongly Disagree",
    ],
    correct: "Agree",
  },
  {
    type: "milestone",
    title: "You Are Almost There!",
    subtitle: "Only 5 Questions Left!",
    description:
      "You've answered 88% of the questions. Just 5 more until your IQ score is ready!",
    button: "Continue",
  },
  {
    type: "question",
    number: 11,
    question: "Which word did we ask you to remember at the start?",
    options: ["A Smart", "B IQ", "C Brain", "D Cognitive", "E Intelligence"],
    correct: "D Cognitive",
  },
  {
    type: "milestone",
    title: "A pattern is starting to show in how you think",
    subtitle: "Every answer adds detail to your cognitive profile.",
    description: "A few more answers to complete your cognitive profile.",
    button: "Continue",
  },
  {
    type: "question",
    number: 12,
    question: "Select the image that best completes the sequence.",
    visual: ["◼️", "◼️", "◼️", "◼️"],
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: "Option B",
  },
];

const screenRoot = document.getElementById("quizScreen");
const progressFill = document.getElementById("progressFill");
const timerNode = document.getElementById("quizTimer");

let currentStep = 0;
let selectedAnswer = null;
let seconds = 0;
let timerInterval = null;
let quizTranslations = {};

/** Get translated quiz text or fall back to English */
function t(key, fallback) {
  return quizTranslations[key] || fallback;
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

function getQuestionProgress() {
  const questionSteps = quizFlow.filter(
    (step) => step.type === "question",
  ).length;
  const currentQuestionIndex = quizFlow
    .slice(0, currentStep + 1)
    .filter((step) => step.type === "question").length;
  return { questionSteps, currentQuestionIndex };
}

function updateProgress() {
  const totalQuestions = quizFlow.filter(
    (step) => step.type === "question",
  ).length;
  const answeredQuestions = quizFlow
    .slice(0, currentStep + 1)
    .filter((step) => step.type === "question").length;
  const progress = Math.min((answeredQuestions / totalQuestions) * 100, 100);
  progressFill.style.width = `${progress}%`;
}

function renderMemorize() {
  const step = quizFlow[currentStep];
  screenRoot.innerHTML = `
    <section class="memorize-panel">
      <div class="memorize-card">
        <h1 class="memorize-label">${t("quiz.memorize_title", "Memorize this word")}</h1>
        <p class="note">${t("quiz.memorize_note", step.note || "You will be asked about it during the quiz")}</p>
        <div class="memorize-word">${step.word}</div>
        <p class="continue-note">${t("quiz.continue_note", "Continue whenever you're ready")}</p>
        <button class="primary-btn memorize-btn" type="button">${t("quiz.memorize_btn", "I've memorized it")}</button>
      </div>
    </section>
  `;

  const button = document.querySelector(".memorize-btn");
  button.addEventListener("click", () => {
    currentStep += 1;
    render();
  });
}

function renderMilestone() {
  const step = quizFlow[currentStep];
  screenRoot.innerHTML = `
    <section class="milestone-panel">
      <div class="progress-ring" aria-label="Question completion">
        <div class="progress-ring-inner">
          <span>${Math.round((getQuestionProgress().currentQuestionIndex / getQuestionProgress().questionSteps) * 100)}%</span>
        </div>
      </div>
      <div class="milestone-copy">
        <h1>${step.title}</h1>
        <h2>${step.subtitle}</h2>
        <p>${step.description}</p>
      </div>
      <button class="primary-btn milestone-btn" type="button">${step.button}</button>
    </section>
  `;

  document.querySelector(".milestone-btn").addEventListener("click", () => {
    currentStep += 1;
    render();
  });
}

function renderQuestion() {
  const step = quizFlow[currentStep];
  const currentNumber = step.number;
  const totalQuestions = quizFlow.filter(
    (item) => item.type === "question",
  ).length;
  const isMultiChoice = step.options && step.options.length > 0;

  screenRoot.innerHTML = `
    <section class="question-panel">
      <div class="question-header">
        <div class="question-count">${currentNumber} ${t("quiz.of", "of")} ${totalQuestions}</div>
      </div>
      <div class="question-card">
        <h1>${step.question}</h1>
        ${step.memorize ? `<div class="memory-block">${step.memorizeNumbers}</div>` : ""}
        ${step.visual ? `<div class="visual-grid">${step.visual.map((v) => `<span>${v}</span>`).join("")}</div>` : ""}
        <div class="answer-list">
          ${step.options
            .map(
              (option) => `
            <button class="option-btn" data-option="${option}" type="button">
              <span class="option-mark" aria-hidden="true"></span>
              <span class="option-label">${option}</span>
            </button>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;

  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      optionButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      selectedAnswer = button.dataset.option;

      setTimeout(() => {
        currentStep += 1;
        render();
      }, 420);
    });
  });
}

function render() {
  const step = quizFlow[currentStep];
  if (!step) {
    const homeHref =
      (window.i18n ? window.i18n.langPrefix() : "") + "/index.html";
    screenRoot.innerHTML = `
      <section class="completion-panel">
        <div class="completion-card">
          <h1>${t("quiz.completion_title", "Your IQ profile is ready.")}</h1>
          <p>${t("quiz.completion_text", "Thanks for completing the assessment.")}</p>
          <a class="primary-btn" href="${homeHref}">${t("quiz.return_home", "Return Home")}</a>
        </div>
      </section>
    `;
    stopTimer();
    return;
  }

  switch (step.type) {
    case "memorize":
      renderMemorize();
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

  updateProgress();
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

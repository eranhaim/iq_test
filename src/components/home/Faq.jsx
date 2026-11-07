import { useState } from "react";
import { useI18n } from "../../i18n/I18nProvider";

const FAQ_COLUMNS = [
  [
    {
      key: 1,
      q: "What does my subscription include?",
      a: "Your subscription includes a personalized IQ report and certificate, full access to all tests, brain training games, educational courses and progress tracking. Your results sync across all devices when you log in.",
    },
    {
      key: 2,
      q: "How do I cancel my subscription?",
      a: "Cancel anytime from your profile or at youriq.com/cancellation. Enter your email, verify the six digit code and confirm. You will keep access until the end of your current paid period.",
    },
    {
      key: 3,
      q: "Are my results private?",
      a: "Yes. Your results are visible only to you unless you choose to share them. Rankings are anonymous, and you can delete your account and personal data at any time.",
    },
    {
      key: 4,
      q: "What is a good IQ score?",
      a: "The average IQ score is 100, and most people score between 85 and 115. A score above 100 is above average, while 130 or higher is within approximately the top 2%.",
    },
  ],
  [
    {
      key: 5,
      q: "Can you increase your IQ score?",
      a: "Your score can improve with education, regular mental practice, quality sleep and good health. Training can also strengthen skills such as memory, focus and pattern recognition.",
    },
    {
      key: 6,
      q: "Where do I find my results?",
      a: "Your IQ score and certificate are available in your profile. Once unlocked, you can download your report as a PDF.",
    },
    {
      key: 7,
      q: "Does IQ change with age?",
      a: "IQ is generally stable, but it can change over time. Processing speed may decline with age, while vocabulary and accumulated knowledge can continue to grow.",
    },
    {
      key: 8,
      q: "Do you inherit your IQ from your parents?",
      a: "Genetics play a role, but IQ is not determined by genes alone. Education, health, environment and life experiences also influence cognitive development.",
    },
  ],
];

export default function Faq() {
  const { t } = useI18n();
  const [openKey, setOpenKey] = useState(1);

  return (
    <section className="faq container" id="faq">
      <h2>{t("faq.title", "Questions, answered.")}</h2>
      <div className="faq-grid">
        {FAQ_COLUMNS.map((column, columnIndex) => (
          <div className="faq-column" key={columnIndex}>
            {column.map((item) => {
              const isOpen = openKey === item.key;
              return (
                <div
                  className={"faq-item" + (isOpen ? " open" : "")}
                  key={item.key}
                >
                  <button
                    className="faq-question"
                    aria-expanded={isOpen}
                    onClick={() => setOpenKey(isOpen ? null : item.key)}
                  >
                    {t("faq.q" + item.key, item.q)}
                  </button>
                  <div className="faq-answer">
                    {t("faq.a" + item.key, item.a)}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

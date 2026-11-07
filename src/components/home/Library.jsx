import { useI18n } from "../../i18n/I18nProvider";

export default function Library() {
  const { t } = useI18n();

  return (
    <section className="content-section container library-wrap">
      <div className="library-copy">
        <h2>{t("library.title", "Build on your results.")}</h2>
        <p>
          {t(
            "library.subtitle",
            "Explore 17 practical courses designed to strengthen how you think, solve problems, create, and connect. All courses are included with your membership.",
          )}
        </p>
        <ul className="check-list compact">
          <li>{t("library.item1", "Learn in just a few minutes at a time")}</li>
          <li>
            {t("library.item2", "Move seamlessly from one lesson to the next")}
          </li>
          <li>
            {t(
              "library.item3",
              "Continue on any device without losing your place",
            )}
          </li>
          <li>
            {t(
              "library.item4",
              "Start confidently, with no prior knowledge needed",
            )}
          </li>
        </ul>
      </div>
      <div className="library-panel">
        <div className="panel-heading">
          {t("library.panel", "Your course library")}
        </div>
        <div className="library-metrics">
          <div>
            <strong>17</strong>
            <span>courses</span>
          </div>
          <div>
            <strong>499</strong>
            <span>lessons</span>
          </div>
          <div>
            <strong>35+</strong>
            <span>hours</span>
          </div>
        </div>
        <div className="library-card">
          <div className="library-header">Video pathways</div>
          <div className="library-count">5 courses</div>
          <ul className="library-list">
            <li>
              Emotional Intelligence Mastery
              <small>106 lessons · 8 hours</small>
            </li>
            <li>
              Strategic Problem Solving
              <small>92 lessons · 6 hours</small>
            </li>
            <li>
              Creative Innovation Pathway
              <small>10 of 41 lessons</small>
            </li>
          </ul>
        </div>
        <p>A sample of the course library inside your account.</p>
      </div>
    </section>
  );
}

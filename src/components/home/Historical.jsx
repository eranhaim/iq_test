import { useI18n } from "../../i18n/I18nProvider";

export default function Historical() {
  const { t } = useI18n();

  return (
    <section className="content-section container">
      <div className="historical-box">
        <div
          className="historical-people"
          aria-label="Historical figures comparison gallery"
        >
          <div className="person person-1">
            <img
              src="/assets/historical/lincoln.jpg"
              alt="Abraham Lincoln portrait"
            />
          </div>
          <div className="person person-2">
            <img
              src="/assets/historical/napoleon.png"
              alt="Napoleon portrait"
            />
          </div>
          <div className="person person-3">
            <img
              src="/assets/historical/washington.jpg"
              alt="George Washington portrait"
            />
          </div>
        </div>
        <div className="historical-info">
          <div className="eyebrow">
            {t("historical.eyebrow", "Also in your report")}
          </div>
          <h3>
            {t("historical.title", "Historical figures with similar scores.")}
          </h3>
          <p>
            {t(
              "historical.subtitle",
              "Thinkers, innovators and leaders whose estimated scores land near yours.",
            )}
          </p>
          <div className="historical-list">
            <button>
              <span>{t("historical.lincoln", "Abraham Lincoln")}</span>{" "}
              <strong>123</strong>
            </button>
            <button>
              <span>{t("historical.napoleon", "Napoleon Bonaparte")}</span>{" "}
              <strong>118</strong>
            </button>
            <button>
              <span>{t("historical.washington", "George Washington")}</span>{" "}
              <strong>113</strong>
            </button>
          </div>
          <p className="fine-print">
            {t(
              "historical.note",
              "Estimated from Cox (1926) - retrospective approximations, not actual measurements.",
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

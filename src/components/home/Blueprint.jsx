import { useI18n } from "../../i18n/I18nProvider";

export default function Blueprint() {
  const { t } = useI18n();

  return (
    <section className="content-section container">
      <div className="section-header centered">
        <h2>{t("blueprint.title", "Your cognitive blueprint.")}</h2>
        <p>
          {t(
            "blueprint.subtitle",
            "See how each cognitive skill translates into real-world advantages.",
          )}
        </p>
      </div>
      <div className="blueprint-grid">
        <article className="blueprint-card">
          <div className="skill-meter">
            <div
              className="meter-ring"
              style={{
                background:
                  "conic-gradient(#0e8a8a 158.4deg, rgba(13,42,56,0.08) 0deg)",
              }}
            >
              <div className="meter-value">
                44
                <span>/100</span>
              </div>
            </div>
            <div className="skill-meta">
              <h3>{t("blueprint.skill1.title", "Fluid reasoning")}</h3>
              <span>{t("blueprint.skill1.level", "Room to grow")}</span>
            </div>
          </div>
          <p>
            {t(
              "blueprint.skill1.text",
              "Solving unfamiliar problems by identifying patterns and logical relationships.",
            )}
          </p>
        </article>
        <article className="blueprint-card">
          <div className="skill-meter">
            <div
              className="meter-ring"
              style={{
                background:
                  "conic-gradient(#0e8a8a 223.2deg, rgba(13,42,56,0.08) 0deg)",
              }}
            >
              <div className="meter-value">
                62
                <span>/100</span>
              </div>
            </div>
            <div className="skill-meta">
              <h3>{t("blueprint.skill2.title", "Visual processing")}</h3>
              <span>{t("blueprint.skill2.level", "Solid")}</span>
            </div>
          </div>
          <p>
            {t(
              "blueprint.skill2.text",
              "Interpreting shapes, spatial relationships, and visual details.",
            )}
          </p>
        </article>
        <article className="blueprint-card">
          <div className="skill-meter">
            <div
              className="meter-ring"
              style={{
                background:
                  "conic-gradient(#0e8a8a 313.2deg, rgba(13,42,56,0.08) 0deg)",
              }}
            >
              <div className="meter-value">
                87
                <span>/100</span>
              </div>
            </div>
            <div className="skill-meta">
              <h3>{t("blueprint.skill3.title", "Working memory")}</h3>
              <span>{t("blueprint.skill3.level", "Your strength")}</span>
            </div>
          </div>
          <p>
            {t(
              "blueprint.skill3.text",
              "Holding and using information while completing a task.",
            )}
          </p>
        </article>
      </div>
    </section>
  );
}

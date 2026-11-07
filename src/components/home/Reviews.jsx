import { useI18n } from "../../i18n/I18nProvider";

export default function Reviews() {
  const { t } = useI18n();

  return (
    <section id="reviews" className="reviews-section container">
      <div className="section-header centered">
        <h2>{t("reviews.title", "What test takers say.")}</h2>
        <p>
          {t(
            "reviews.subtitle",
            "Verified reviews collected by Trustpilot from people who took the test.",
          )}
        </p>
      </div>
      <div className="reviews-grid">
        <article className="review-card">
          <div className="review-top">
            <span className="rating">★★★★★</span>
            <span className="invited-badge">
              {t("reviews.badge", "Invited")}
            </span>
          </div>
          <h3>{t("reviews.card1.title", "Coincidence? I don’t think so!")}</h3>
          <p>
            {t(
              "reviews.card1.text",
              "Your test is accurate - the IQ I got matches my real one within 3%.",
            )}
          </p>
          <span className="review-author">
            {t("reviews.card1.author", "Mirekiq · Czechia")}
          </span>
        </article>
        <article className="review-card">
          <div className="review-top">
            <span className="rating">★★★★☆</span>
            <span className="invited-badge">
              {t("reviews.badge", "Invited")}
            </span>
          </div>
          <h3>{t("reviews.card2.title", "Fun and interesting")}</h3>
          <p>
            {t(
              "reviews.card2.text",
              "Fun, quick and easy. Although I really wonder how accurate this is.",
            )}
          </p>
          <span className="review-author">
            {t("reviews.card2.author", "Mbdaking · United States")}
          </span>
        </article>
        <article className="review-card">
          <div className="review-top">
            <span className="rating">★★★★★</span>
            <span className="invited-badge">
              {t("reviews.badge", "Invited")}
            </span>
          </div>
          <h3>{t("reviews.card3.title", "Short but challenging")}</h3>
          <p>
            {t(
              "reviews.card3.text",
              "It was short but challenging. Really enjoyed it.",
            )}
          </p>
          <span className="review-author">
            {t("reviews.card3.author", "E.B. · Greece")}
          </span>
        </article>
      </div>
      <div className="trustline">
        <p>
          {t(
            "reviews.trustline",
            "Rated 4.1 / 5 based on 151,263 reviews. Showing our 3, 4 & 5 star reviews.",
          )}
        </p>
        <span>{t("trustpilot", "Trustpilot")}</span>
      </div>
    </section>
  );
}

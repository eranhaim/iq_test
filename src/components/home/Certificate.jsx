import { useI18n } from "../../i18n/I18nProvider";

export default function Certificate() {
  const { t } = useI18n();

  return (
    <section className="content-section container">
      <div className="certificate-wrap">
        <div className="certificate-copy">
          <div className="eyebrow with-icon">
            {t("certificate.eyebrow", "Verifiable credential")}
          </div>
          <h2>{t("certificate.title", "Your certificate, ready to share.")}</h2>
          <p>
            {t(
              "certificate.subtitle",
              "Download, verify, and share your achievement at any time.",
            )}
          </p>
          <ul className="check-list compact">
            <li>
              {t(
                "certificate.item1",
                "A personalized certificate with your name, score, and completion date",
              )}
            </li>
            <li>
              {t(
                "certificate.item2",
                "A permanent certificate ID and scannable verification code",
              )}
            </li>
            <li>
              {t(
                "certificate.item3",
                "Downloadable certificate image and full PDF report",
              )}
            </li>
            <li>
              {t(
                "certificate.item4",
                "Easy to add to LinkedIn or share online",
              )}
            </li>
          </ul>
          <a href="#" className="text-link">
            {t("certificate.verify", "Verify your results")}
          </a>
        </div>
        <div className="certificate-card" aria-label="Sample IQ certificate">
          <div className="certificate-inner">
            <div className="certificate-qrcode"></div>
            <div className="certificate-body">
              <div className="cert-type">General Intelligence Quotient</div>
              <div className="cert-heading">Certificate</div>
              <div className="cert-awarded">awarded to</div>
              <div className="cert-name">James Anderson</div>
              <p>
                in recognition of successful completion of the yourIQ Test with
                the following score:
              </p>
              <div className="cert-score">120</div>
              <div className="cert-date">June 1, 2026</div>
            </div>
          </div>
          <div className="certificate-id">Certificate ID 4829 1375</div>
        </div>
      </div>
    </section>
  );
}

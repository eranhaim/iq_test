const BRANDS = [
  { file: "business-insider.svg", name: "Business Insider", width: 137 },
  { file: "digital-trends.svg", name: "Digital Trends", width: 109 },
  { file: "msn.svg", name: "MSN", width: 52 },
  { file: "newsweek.svg", name: "Newsweek", width: 93 },
  { file: "usa-today.svg", name: "USA Today", width: 56 },
  { file: "yahoo-finance.svg", name: "Yahoo Finance", width: 107 },
];

function BrandList({ hidden }) {
  return (
    <ul className="press-track-list" aria-hidden={hidden || undefined}>
      {BRANDS.map((brand) => (
        <li key={brand.file}>
          <img
            src={`/assets/brands/${brand.file}`}
            alt={hidden ? "" : brand.name}
            height="26"
            style={{ aspectRatio: `${brand.width} / 20` }}
          />
        </li>
      ))}
    </ul>
  );
}

export default function PressStrip() {
  return (
    <section className="press-strip">
      <div className="container">
        <p>yourIQ has been featured on</p>
        <div className="press-carousel" dir="ltr" aria-label="Brand coverage">
          <div className="press-track">
            <BrandList />
            <BrandList hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

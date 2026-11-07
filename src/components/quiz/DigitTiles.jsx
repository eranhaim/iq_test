export default function DigitTiles({ digits }) {
  return (
    <div className="digit-tiles" dir="ltr">
      {digits.map((digit, index) => (
        <span className="digit-tile" key={index}>
          {digit}
        </span>
      ))}
    </div>
  );
}

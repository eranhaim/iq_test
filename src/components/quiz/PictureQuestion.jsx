import { useState } from "react";
import PuzzleLayout from "./PuzzleLayout";

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"];
const OPTION_FILES = [1, 2, 3, 4, 5, 6];

/** Inline stand-in shown until the real SVG is added */
function placeholderSrc(label, width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="10" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8 6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, sans-serif" font-size="${Math.round(height / 5)}" fill="#64748b">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function PictureImage({ src, label, width, height }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? placeholderSrc(label, width, height) : src}
      alt=""
      onError={() => setFailed(true)}
    />
  );
}

export default function PictureQuestion({ step, onAnswer }) {
  const base = `/assets/quiz/${step.id}`;
  const files = step.optionFiles || OPTION_FILES;

  return (
    <PuzzleLayout
      stage={
        <PictureImage
          src={`${base}/question.svg`}
          label={step.id.toUpperCase()}
          width={600}
          height={450}
        />
      }
    >
      {files.map((file, index) => (
        <button
          key={file}
          className="puzzle-option"
          type="button"
          aria-label={OPTION_LETTERS[index]}
          onClick={() => onAnswer(step.id, index)}
        >
          <PictureImage
            src={`${base}/option-${file}.svg`}
            label={OPTION_LETTERS[index]}
            width={200}
            height={120}
          />
        </button>
      ))}
    </PuzzleLayout>
  );
}

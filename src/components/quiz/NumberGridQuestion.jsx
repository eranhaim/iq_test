import PuzzleLayout from "./PuzzleLayout";

export default function NumberGridQuestion({ step, onAnswer }) {
  const stage = (
    <div className="number-grid">
      {step.grid.map((value, index) => (
        <span className="grid-cell" key={index}>
          {value}
        </span>
      ))}
      <span className="grid-cell grid-unknown">?</span>
    </div>
  );

  return (
    <PuzzleLayout stage={stage}>
      {step.options.map((option, index) => (
        <button
          key={index}
          className="puzzle-option puzzle-option-text"
          type="button"
          onClick={() => onAnswer(step.id, index)}
        >
          {option}
        </button>
      ))}
    </PuzzleLayout>
  );
}

interface Props {
  score: number;
  onRestart: () => void;
}

export default function EndScreen({ score, onRestart }: Props) {
  return (
    <div className="end-screen">
      <h2>Your score: {score}</h2>
      <button onClick={onRestart}>Play Again</button>
    </div>
  );
}

interface Props {
  score: number;
  onRestart: () => void;
}

export default function EndScreen({ score, onRestart }: Props) {
  return (
    <div className="end-screen">
      <h2>Ваш результат: {score}</h2>
      <button onClick={onRestart}>Играть снова</button>
    </div>
  );
}

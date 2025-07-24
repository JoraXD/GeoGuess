interface Props {
  correct: boolean;
  distance: number;
}

export default function ResultOverlay({ correct, distance }: Props) {
  const color = distance <= 50 ? 'green' : distance <= 200 ? 'yellow' : 'red';
  return (
    <div className="result-overlay" style={{ background: color }}>
      {correct ? 'Correct!' : 'Wrong!'} Distance: {distance.toFixed(2)} km
    </div>
  );
}

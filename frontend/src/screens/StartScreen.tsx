interface Props {
  onStart: (mode: 'sprint' | 'survival') => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="start-screen">
      <h1>GeoGuess Game</h1>
      <button onClick={() => onStart('sprint')}>Sprint</button>
      <button onClick={() => onStart('survival')}>Survival</button>
    </div>
  );
}

interface Props {
  onStart: (mode: 'sprint' | 'survival') => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="start-screen">
      <h1>Игра GeoGuess</h1>
      <button onClick={() => onStart('sprint')}>Спринт</button>
      <button onClick={() => onStart('survival')}>Выживание</button>
    </div>
  );
}

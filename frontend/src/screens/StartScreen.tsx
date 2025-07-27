import { useState } from 'react';
import { Category } from '../types';

interface Props {
  onStart: (mode: 'sprint' | 'survival', category: Category) => void;
}

export default function StartScreen({ onStart }: Props) {
  const [category, setCategory] = useState<Category>('landmark');

  return (
    <div className="start-screen">
      <h1>Игра GeoGuess</h1>
      <select
        value={category}
        onChange={e => setCategory(e.target.value as Category)}
      >
        <option value="landmark">Достопримечательности</option>
        <option value="capital">Столицы</option>
        <option value="country">Страны</option>
        <option value="mixed">Смешанная</option>
      </select>
      <button onClick={() => onStart('sprint', category)}>Спринт</button>
      <button onClick={() => onStart('survival', category)}>Выживание</button>
    </div>
  );
}

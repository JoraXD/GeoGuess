import { useState } from 'react';
import { Category } from './types';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';

export default function App() {
  const [mode, setMode] = useState<'start' | 'sprint' | 'survival' | 'end'>('start');
  const [score, setScore] = useState(0);
  const [category, setCategory] = useState<Category>('landmark');

  const handleStart = (m: 'sprint' | 'survival', c: Category) => {
    setCategory(c);
    setMode(m);
  };

  const handleFinish = (s: number) => {
    setScore(s);
    setMode('end');
  };

  const handleHome = () => {
    setMode('start');
  };

  const handleRestart = () => {
    setScore(0);
    setMode('start');
  };

  if (mode === 'start') return <StartScreen onStart={handleStart} />;
  if (mode === 'sprint' || mode === 'survival')
    return (
      <GameScreen
        mode={mode}
        category={category}
        onFinish={handleFinish}
        onHome={handleHome}
      />
    );
  return <EndScreen score={score} onRestart={handleRestart} />;
}

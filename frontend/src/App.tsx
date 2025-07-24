import { useState } from 'react';
import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import EndScreen from './screens/EndScreen';

export default function App() {
  const [mode, setMode] = useState<'start' | 'sprint' | 'survival' | 'end'>('start');
  const [score, setScore] = useState(0);

  const handleStart = (m: 'sprint' | 'survival') => {
    setMode(m);
  };

  const handleFinish = (s: number) => {
    setScore(s);
    setMode('end');
  };

  const handleRestart = () => {
    setScore(0);
    setMode('start');
  };

  if (mode === 'start') return <StartScreen onStart={handleStart} />;
  if (mode === 'sprint' || mode === 'survival')
    return <GameScreen mode={mode} onFinish={handleFinish} />;
  return <EndScreen score={score} onRestart={handleRestart} />;
}

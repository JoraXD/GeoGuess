import { useEffect, useState } from 'react';
import GameMap from '../components/Map';
import QuestionBox from '../components/QuestionBox';
import StrikeCounter from '../components/StrikeCounter';
import GameTimer from '../components/GameTimer';
import ResultOverlay from '../components/ResultOverlay';

import { Question, AnswerResponse } from '../../backend/src/types';

interface Props {
  mode: 'sprint' | 'survival';
  onFinish: (score: number) => void;
}

export default function GameScreen({ mode, onFinish }: Props) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [clicked, setClicked] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<AnswerResponse | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/questions?category=landmark')
      .then(r => r.json())
      .then(setQuestion);
  }, [result]);

  const handleClick = (lat: number, lng: number) => {
    if (!question) return;
    setClicked([lat, lng]);
    fetch('/check-answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionId: question.id,
        clickedLat: lat,
        clickedLng: lng,
        sessionId: 'demo',
      }),
    })
      .then(r => r.json())
      .then((data: AnswerResponse) => {
        setResult(data);
        if (data.correct) setScore(s => s + 1);
        if (mode === 'survival' && !data.correct) onFinish(score);
      });
  };

  const handleExpire = () => {
    if (mode === 'survival') onFinish(score);
  };

  return (
    <div className="game-screen">
      {question && (
        <QuestionBox text={question.text} hint={question.hint} />
      )}
      <StrikeCounter strike={result?.strike || 0} />
      <GameTimer seconds={60} onExpire={handleExpire} />
      <div className="map-container">
        <GameMap
          onMapClick={handleClick}
          correctPoint={result ? [result.correctLat, result.correctLng] : undefined}
          clickedPoint={clicked ? [clicked[0], clicked[1]] : undefined}
        />
        {result && (
          <ResultOverlay
            correct={result.correct}
            distance={result.distanceKm}
          />
        )}
      </div>
    </div>
  );
}

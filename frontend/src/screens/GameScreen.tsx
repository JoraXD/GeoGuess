import { useEffect, useState } from 'react';
import GameMap from '../components/Map';
import QuestionBox from '../components/QuestionBox';
import StrikeCounter from '../components/StrikeCounter';
import GameTimer from '../components/GameTimer';
import ResultOverlay from '../components/ResultOverlay';

import { Question, AnswerResponse } from '../types';


interface Props {
  mode: 'sprint' | 'survival';
  onFinish: (score: number) => void;
}

export default function GameScreen({ mode, onFinish }: Props) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [clicked, setClicked] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<AnswerResponse | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);
  const [strike, setStrike] = useState(0);
  const [qTime, setQTime] = useState(60);
  const [gameTime, setGameTime] = useState(mode === 'sprint' ? 120 : 0);

  const fetchQuestion = () => {
    fetch('/questions?category=landmark')
      .then(r => r.json())
      .then((q: Question) => {
        setQuestion(q);
        setClicked(null);
        setResult(null);
        setQTime(60);
      });
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (mode === 'sprint') {
      if (gameTime <= 0 || asked >= 10) {
        onFinish(score);
        return;
      }
      const id = setTimeout(() => setGameTime(t => t - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [gameTime, asked, mode, score, onFinish]);

  useEffect(() => {
    if (qTime <= 0) {
      if (mode === 'survival') {
        onFinish(score);
      } else {
        setAsked(a => a + 1);
        fetchQuestion();
      }
      return;
    }
    const id = setTimeout(() => setQTime(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [qTime, mode, score, onFinish]);

  const handleClick = (lat: number, lng: number) => {
    if (!question || result) return;

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
        setStrike(data.strike);
        if (data.correct) setScore(s => s + 1);
        else if (mode === 'survival') onFinish(score);
      });
  };

  useEffect(() => {
    if (result && mode === 'sprint') {
      const id = setTimeout(() => {
        setAsked(a => a + 1);
        fetchQuestion();
      }, 1500);
      return () => clearTimeout(id);
    }
    if (result && mode === 'survival' && result.correct) {
      const id = setTimeout(() => fetchQuestion(), 1500);
      return () => clearTimeout(id);
    }
  }, [result, mode]);

  return (
    <div className="game-screen">
      {question && <QuestionBox text={question.text} hint={question.hint} />}
      <StrikeCounter strike={strike} />
      <div className="timers">
        <GameTimer seconds={qTime} onExpire={() => {}} />
        {mode === 'sprint' && <GameTimer seconds={gameTime} onExpire={() => {}} />}
      </div>

      <div className="map-container">
        <GameMap
          onMapClick={handleClick}
          correctPoint={result ? [result.correctLat, result.correctLng] : undefined}
          clickedPoint={clicked ? [clicked[0], clicked[1]] : undefined}
          lineColor={result ? (result.distanceKm <= 50 ? 'green' : result.distanceKm <= 200 ? 'yellow' : 'red') : 'blue'}
        />
        {result && <ResultOverlay correct={result.correct} distance={result.distanceKm} />}

      </div>
    </div>
  );
}

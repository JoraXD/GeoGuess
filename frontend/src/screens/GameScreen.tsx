import { useEffect, useState } from 'react';
import GameMap from '../components/Map';
import QuestionBox from '../components/QuestionBox';
import StrikeCounter from '../components/StrikeCounter';
import GameTimer from '../components/GameTimer';
import StatsModal from '../components/StatsModal';

import { Question, AnswerResponse } from '../types';
interface Props {
  mode: 'sprint' | 'survival';
  onFinish: (score: number) => void;
  onHome: () => void;
}

export default function GameScreen({ mode, onFinish, onHome }: Props) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [clicked, setClicked] = useState<[number, number] | null>(null);
  const [result, setResult] = useState<AnswerResponse | null>(null);
  const [score, setScore] = useState(0);
  const [asked, setAsked] = useState(0);
  const [strike, setStrike] = useState(0);
  const [qTime, setQTime] = useState(60);
  const [gameTime, setGameTime] = useState(mode === 'sprint' ? 120 : 0);

  const fetchQuestion = () => {
    fetch('http://localhost:3000/questions?category=landmark')
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
      if (result) return;
      if (gameTime <= 0 || asked >= 10) {
        onFinish(score);
        return;
      }
      const id = setTimeout(() => setGameTime((t: number) => t - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [gameTime, asked, mode, score, onFinish]);

  useEffect(() => {
    if (result) return;
    if (qTime <= 0) {
      if (mode === 'survival') {
        onFinish(score);
      } else {
        setAsked((a: number) => a + 1);
        fetchQuestion();
      }
      return;
    }
    const id = setTimeout(() => setQTime((t: number) => t - 1), 1000);

    return () => clearTimeout(id);
  }, [qTime, mode, score, onFinish]);

  const handleClick = (lat: number, lng: number) => {
    if (!question || result) return;

    setClicked([lat, lng]);
    fetch('http://localhost:3000/check-answer', {
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
        if (data.correct) setScore((s: number) => s + 1);
      });
  };

  const handleContinue = () => {
    if (!result) return;
    const nextAsked = asked + 1;
    if (mode === 'sprint') {
      if (gameTime <= 0 || nextAsked > 10) {
        onFinish(score);
        return;
      }
      setAsked(nextAsked);
    } else {
      if (!result.correct) {
        onFinish(score);
        return;
      }
      setAsked(nextAsked);
    }
    fetchQuestion();
  };

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
          answerCorrect={result ? result.correct : undefined}
        />
        {result && (
          <StatsModal
            correct={result.correct}
            distance={result.distanceKm}
            score={score}
            question={asked + 1}
            onContinue={handleContinue}
            onHome={onHome}
          />
        )}
      </div>
    </div>
  );
}

import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  correct: boolean;
  distance: number;
  score: number;
  question: number;
  onContinue: () => void;
  onHome: () => void;
}

export default function StatsModal({ correct, distance, score, question, onContinue, onHome }: Props) {
  const color = distance <= 50 ? 'green' : distance <= 200 ? 'yellow' : 'red';

  const modal = (
    <div className="stats-modal">
      <div className="stats-modal-content">
        <h2 style={{ color }}>{correct ? 'Correct!' : 'Wrong!'}</h2>
        <p>Distance: {distance.toFixed(2)} km</p>
        <p>Score: {score}</p>
        <p>Question: {question}</p>
        <div className="stats-buttons">
          <button onClick={onContinue}>Continue</button>
          <button onClick={onHome}>Home</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
}

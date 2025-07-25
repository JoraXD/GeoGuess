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
        <h2 style={{ color }}>{correct ? 'Верно!' : 'Неверно!'}</h2>
        <p>Расстояние: {distance.toFixed(2)} км</p>
        <p>Счёт: {score}</p>
        <p>Вопрос: {question}</p>
        <div className="stats-buttons">
          <button onClick={onContinue}>Далее</button>
          <button onClick={onHome}>На главную</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);

}

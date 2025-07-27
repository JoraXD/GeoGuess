interface Props {
  time: number;
  total: number;
  label?: string;
}

export default function GameTimer({ time, total, label }: Props) {
  const ratio = Math.max(0, Math.min(1, time / total));
  const barClass = `timer-bar${time <= 10 ? ' low' : ''}`;

    return (
    <div className="game-timer">
      <div className={barClass} style={{ width: `${ratio * 100}%` }} />
      {label && <span className="timer-label">{label}</span>}
      <span className="timer-time">{time}</span>
    </div>
  );
}

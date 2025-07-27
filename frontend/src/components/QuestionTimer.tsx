import { useEffect, useState } from 'react';

interface Props {
  seconds: number;
  onExpire: () => void;
}

export default function QuestionTimer({ seconds, onExpire }: Props) {
  const [time, setTime] = useState(seconds);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setTime(seconds);
    setExpired(false);
  }, [seconds]);

  useEffect(() => {
    if (time <= 0) {
      if (!expired) onExpire();
      setExpired(true);
      return;
    }
    const id = setTimeout(() => setTime(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [time, onExpire, expired]);

  const progress = (time / seconds) * 100;

  return (
    <div className={`question-timer${expired ? ' time-up' : ''}`}> 
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <span className="timer-label">{time}</span>
    </div>
  );
}

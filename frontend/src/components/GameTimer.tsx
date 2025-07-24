import { useEffect, useState } from 'react';

interface Props {
  seconds: number;
  onExpire: () => void;
}

export default function GameTimer({ seconds, onExpire }: Props) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time <= 0) {
      onExpire();
      return;
    }
    const id = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(id);
  }, [time, onExpire]);

  return <div className="game-timer">Time: {time}</div>;
}

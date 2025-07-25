interface Props {
  strike: number;
}

export default function StrikeCounter({ strike }: Props) {
  return <div className="strike-counter">Серия: {strike}</div>;
}

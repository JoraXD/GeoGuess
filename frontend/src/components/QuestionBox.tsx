interface Props {
  text: string;
  hint: string;
}

export default function QuestionBox({ text, hint }: Props) {
  return (
    <div className="question-box">
      <p>{text}</p>
      <small>{hint}</small>
    </div>
  );
}

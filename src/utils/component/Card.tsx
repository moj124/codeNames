import { useState } from "react";

interface Word {
  word: string;
  color: string;
}

export function Card({ word, color }: Word): JSX.Element {
  const [colorText, setColor] = useState(color);

  const handleClick = () =>
    colorText !== `black${color}` ? setColor(`black${color}`) : setColor(color);

  return (
    <button className="card" id={colorText} onClick={handleClick}>
      {word}
    </button>
  );
}

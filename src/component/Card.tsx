import styles from "../css/Card.module.css";
import { Color } from "../types/Color";

interface Props {
  color: string;
  word: string;
  ishidden: boolean;
  overview: boolean;
  handleClick(): void;
}

export function Card({
  color,
  word,
  ishidden,
  overview,
  handleClick,
}: Props): JSX.Element {
  return (
    <>
      <button
        className={styles.card}
        id={
          ishidden
            ? overview
              ? color === Color.Red
                ? styles.blackred
                : color === Color.Blue
                ? styles.blackblue
                : color === Color.Gray
                ? styles.blackgray
                : styles.blackblack
              : styles.blackblack
            : color === Color.Red
            ? styles.red
            : color === Color.Blue
            ? styles.blue
            : color === Color.Gray
            ? styles.gray
            : styles.black
        }
        onClick={handleClick}
      >
        {word}
      </button>
    </>
  );
}

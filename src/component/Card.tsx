import { Word } from "../types/Word";
import styles from "./Card.module.css";
interface Props {
  word: Word;
  overview: boolean;
  handleClick(): void;
}

export function Card({ word, overview, handleClick }: Props): JSX.Element {
  return (
    <>
      <button
        className={styles.card}
        id={
          word.ishidden
            ? overview
              ? word.color === "red"
                ? styles.blackred
                : word.color === "blue"
                ? styles.blackblue
                : word.color === "gray"
                ? styles.blackgray
                : styles.blackblack
              : styles.blackblack
            : word.color === "red"
            ? styles.red
            : word.color === "blue"
            ? styles.blue
            : word.color === "gray"
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

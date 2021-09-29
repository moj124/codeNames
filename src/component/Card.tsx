import { Word } from "../App";
import styles from "./Card.module.css";
interface Props {
  color: string;
  word: string;
  boardState: Word[];
  turn: boolean;
  overview: boolean;
  win: boolean;
  setWin(bool: boolean): void;
  setTurn(bool: boolean): void;
  setBoardState(arr: Word[]): void;
}

export function Card({
  color,
  word,
  boardState,
  overview,
  turn,
  win,
  setWin,
  setTurn,
  setBoardState,
}: Props): JSX.Element {
  const handleClick = () => {
    const cardIndex = boardState.findIndex((element) => element.word === word);
    const selectedCard = boardState[cardIndex];
    selectedCard.ishidden = false;

    setBoardState([...boardState]);

    if (color === "gray") {
      const dat = [...boardState];
      dat.forEach((element, index) => (element.ishidden = false));
      setBoardState([...dat]);
      console.log(win, color, dat);
      setWin(true);
    }
    if ((turn && color === "blue") || (!turn && color === "red")) {
      setTurn(!turn);
    }
  };

  return (
    <>
      <button
        className={styles.card}
        id={
          boardState.find((element) => element.word === word)?.ishidden
            ? overview
              ? color === "red"
                ? styles.blackred
                : color === "blue"
                ? styles.blackblue
                : color === "gray"
                ? styles.blackgray
                : styles.blackblack
              : styles.blackblack
            : color === "red"
            ? styles.red
            : color === "blue"
            ? styles.blue
            : color === "gray"
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

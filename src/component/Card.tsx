interface Word {
  word: string;
  color: string;
  boardState: string[][];
  turn: boolean;
  overview: boolean;
  win: boolean;
  setWin(bool: boolean): void;
  setTurn(bool: boolean): void;
  setBoardState(arr: string[][]): void;
}

export function Card({
  word,
  color,
  boardState,
  turn,
  overview,
  win,
  setWin,
  setTurn,
  setBoardState,
}: Word): JSX.Element {
  const handleClick = () => {
    const cardIndex = boardState.findIndex((element) => element[0] === word);
    const selectedCard = boardState[cardIndex];
    const newCardValue = selectedCard[1].length > 5 ? selectedCard[1].slice(5) : selectedCard[1];
    selectedCard[1] = newCardValue;
      
    setBoardState([...boardState]);

    if (color === "blackgray") {
      const dat = [...boardState];
      dat.forEach(
        (element, index) =>
          (dat[index][1] =
            element[1].length > 5 ? element[1].slice(5) : element[1])
      );
      setBoardState([...dat]);
      console.log(win, color, dat);
      setWin(true);
    }
    if (turn && color.length > 5) {
      setTurn(!turn);
    } else if (!turn && color.length > 5) {
      setTurn(!turn);
    }
  };

  return (
    <>
      {overview || color.length <= 5 ? (
        <button className="card" id={color} onClick={handleClick}>
          {word}
        </button>
      ) : (
        <button className="card" id="blackblack" onClick={handleClick}>
          {word}
        </button>
      )}
    </>
  );
}

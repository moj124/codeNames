interface Word {
  word: string;
  color: string;
  data: string[][];
  turn: boolean;
  overview: boolean;
  win: boolean;
  setWin(bool:boolean): void;
  setTurn(bool: boolean): void;
  setState(arr: string[][]): void;
}

export function Card({
  word,
  color,
  data,
  turn,
  overview,
  win,
  setWin,
  setTurn,
  setState,
}: Word): JSX.Element {

  const handleClick = () => {
    const idx = data.findIndex((element) => element[0] === word);
    data[idx][1] =
      data[idx][1].length > 5 ? data[idx][1].slice(5) : data[idx][1];
    setState([...data]);

    if(color === "blackgray"){
        const dat = [...data];
        dat.forEach((element,index) => dat[index][1]= element[1].length > 5 ? element[1].slice(5) : element[1]);
        setState([...dat])
      console.log(win,color,dat)
      setWin(true)
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

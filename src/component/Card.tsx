interface Word {
  word: string;
  color: string;
  data: string[][];
  setState(arr:string[][]):void;
}

export function Card({ word, color, data, setState }: Word): JSX.Element {

  const handleClick = () => {
    const idx = data.findIndex(element => element[0] === word);
    data[idx][1] = data[idx][1].length > 5 ? data[idx][1].slice(5) : data[idx][1];
    // console.log(idx,data[idx],word)x
    setState([...data]);
  } 
  
  return (
    <button className="card" id={color} onClick={handleClick}>
      {word}
    </button>
  );
}

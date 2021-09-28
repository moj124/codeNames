import { Card } from "./component/Card";
import { shuffle } from "./utils/shuffle";
import { useState } from "react";
import { generateWords } from "./utils/generateWords";
import { words } from "./words.json";

function App(): JSX.Element {
  const [win, setWin] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const [overview, setView] = useState<boolean>(false);
  const gameWords = shuffle(generateWords(words, turn));
  const [boardState, setBoardState] = useState<string[][]>(gameWords);

  const post = boardState.map((element, index) => (
    <Card
      key={index}
      boardState={boardState}
      turn={turn}
      overview={overview}
      win={win}
      setWin={(bool: boolean) => setWin(bool)}
      setBoardState={(arr: string[][]) => setBoardState(arr)}
      setTurn={(bool: boolean) => setTurn(bool)}
      word={element[0]}
      color={element[1]}
    />
  ));

  const reds = boardState.filter((element) => element[1] === "blackred").length;
  const blues = boardState.filter(
    (element) => element[1] === "blackblue"
  ).length;

  return (
    <>
      <header>
        <h1>CODENAMES</h1>
      </header>

      <main>
        <div className="info">
          <p>
            <span id="redText">{reds}</span> -{" "}
            <span id="blueText">{blues}</span>
          </p>
          <p>
            {turn
              ? win
                ? "Red Wins"
                : "Red's Turn"
              : win
              ? "Blue Wins"
              : "Blue's Turn"}
          </p>
          <button onClick={() => setTurn(!turn)}>End Turn</button>
        </div>
        <div>{post}</div>
      </main>

      <footer>
        <div>
          <button onClick={() => setView(false)}>Player</button>
          <button onClick={() => setView(true)}>Spymaster</button>
          <button
            onClick={() => {
              setBoardState(gameWords);
              setTurn(!turn);
              setWin(false);
            }}
          >
            Next game
          </button>
        </div>
      </footer>
    </>
  );
}

export default App;

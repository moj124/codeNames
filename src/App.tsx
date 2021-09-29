import { Card } from "./component/Card";
import { shuffle } from "./utils/shuffle";
import { useState } from "react";
import { generateWords } from "./utils/generateWords";
import { words } from "./words.json";

export interface Word {
  word: string;
  color: string;
  ishidden: boolean;
}

function App(): JSX.Element {
  const [win, setWin] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const [overview, setView] = useState<boolean>(false);
  const [boardState, setBoardState] = useState<Word[]>(
    shuffle(generateWords(words, turn))
  );

  const gameWords = shuffle(generateWords(words, turn));
  const post = boardState.map((element, index) => (
    <Card
      key={index}
      color={element.color}
      word={element.word}
      boardState={boardState}
      overview={overview}
      win={win}
      turn={turn}
      setBoardState={(cards: Word[]) => setBoardState(cards)}
      setTurn={(turn: boolean) => setTurn(turn)}
      setWin={(win: boolean) => setWin(win)}
    />
  ));

  const reds = boardState.filter(
    (element) => element.ishidden === true && element.color === "red"
  ).length;
  const blues = boardState.filter(
    (element) => element.color === "blue" && element.ishidden === true
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
              setTurn(!turn);
              setWin(false);
              setBoardState(gameWords);
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

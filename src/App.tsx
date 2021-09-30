import { Card } from "./component/Card";
import { shuffle } from "./utils/shuffle";
import { useState } from "react";
import { generateWords } from "./utils/generateWords";
import { words } from "./words.json";
import { Word } from "./types/Word";
function App(): JSX.Element {
  const [win, setWin] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const [overview, setView] = useState<boolean>(false);
  const [boardState, setBoardState] = useState<Word[]>(
    shuffle(generateWords(words, turn))
  );

  const gameWords = shuffle(generateWords(words, turn));

  const handleClick = (word: string, color: string) => {
    if (color === "gray") {
      const dat = [...boardState];
      dat.forEach((element, index) => (element.ishidden = false));
      setBoardState([...dat]);
      setWin(true);
    } else {
      const cardIndex = boardState.findIndex(
        (element) => element.word === word
      );
      const selectedCard = boardState[cardIndex];
      selectedCard.ishidden = false;

      setBoardState([...boardState]);
    }

    if ((turn && color === "blue") || (!turn && color === "red")) {
      setTurn(!turn);
    }
  };

  const post = boardState.map((element, index) => (
    <Card
      key={index}
      word={element}
      overview={overview}
      handleClick={() => handleClick(element.word, element.color)}
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

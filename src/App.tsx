import { Card } from "./component/Card";
import { useState, useEffect } from "react";
import useInterval from "./utils/useInterval";
import { Color } from "./types/Color";
import { Word } from "./types/Word";

interface SessionDetails {
  session: string;
}

function App({ session }: SessionDetails): JSX.Element {
  const [win, setWin] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(true);
  const [overview, setView] = useState<boolean>(false);
  const [boardState, setBoardState] = useState<Word[]>([]);
  useInterval(() => {
    const fetchWords = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/game/${session}`);
      const words = await res.json();
      console.log(words);
      setBoardState(words.data);
      setTurn(words.turn);
    };
    fetchWords();
  }, 2000);

  useEffect(() => {
    const fetchWords = async () => {
      const res = await fetch(`${process.env.REACT_APP_API}/game/${session}`);
      const words = await res.json();
      setBoardState(words.data);
      setTurn(words.turn);
    };
    fetchWords();
  }, [session]);

  const handleWin = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API}/game/${session}/next`
    );
    const words = await res.json();
    setBoardState(words.data);
    setTurn(words.turn);
    setWin(false);
  };

  const handleClick = async (
    word_id: number,
    word: string,
    color: Color,
    ishidden: boolean
  ) => {
    if (ishidden) {
      if ((turn && color === Color.Blue) || (!turn && color === Color.Red)) {
        setTurn(!turn);
      }
      if (color === Color.Gray) {
        const dat = [...boardState];
        dat.forEach((element) => (element.ishidden = false));
        await fetch(`${process.env.REACT_APP_API}/game/${session}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([turn, dat]),
        });

        setBoardState([...dat]);
        setTurn(!turn);
        setWin(true);
      } else {
        const cardIndex = boardState.findIndex(
          (element) => element.word === word
        );
        const selectedCard = boardState[cardIndex];
        selectedCard.ishidden = false;
        await fetch(`${process.env.REACT_APP_API}/game/${session}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            turn,
            [{ word_id: word_id, word: word, color: color, ishidden: false }],
          ]),
        });
        setBoardState([...boardState]);
      }
    }
  };

  const handleTurn = async () => {
    setTurn(!turn);
    await fetch(`${process.env.REACT_APP_API}/game/${session}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify([turn]),
    });
  };

  const post = boardState.map((element, index) => (
    <Card
      key={index}
      color={element.color}
      word={element.word}
      ishidden={element.ishidden}
      overview={overview}
      handleClick={() =>
        handleClick(
          element.word_id,
          element.word,
          element.color,
          element.ishidden
        )
      }
    />
  ));

  const reds = boardState.filter(
    (element) => element.ishidden === true && element.color === Color.Red
  ).length;
  const blues = boardState.filter(
    (element) => element.color === Color.Blue && element.ishidden === true
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
          <button onClick={handleTurn} disabled={win}>
            End Turn
          </button>
        </div>
        <div>{post}</div>
      </main>

      <footer>
        <div>
          <button onClick={() => setView(false)}>Player</button>
          <button onClick={() => setView(true)}>Spymaster</button>
          <button onClick={handleWin}>Next game</button>
        </div>
      </footer>
    </>
  );
}

export default App;

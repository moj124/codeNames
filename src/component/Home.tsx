// import styles from "./Home.module.css";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
export function Home(): JSX.Element {
  const history = useHistory();
  const handleClick = async () => {
    const res = await fetch(
      `https://nameless-earth-29523.herokuapp.com/generateSession`
    );
    const { session } = await res.json();
    history.push(`/game/${session}`);
    // console.log(await res.json())
  };

  return (
    <>
      <header>
        <h1>CODENAMES</h1>
      </header>
      <main>
        <Router>
          <button onClick={handleClick}>Start Game</button>
        </Router>
      </main>
      <footer></footer>
    </>
  );
}

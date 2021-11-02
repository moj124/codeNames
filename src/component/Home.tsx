import styles from "./Home.module.css";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
export function Home(): JSX.Element {

  const history = useHistory();
  const handleClick = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/generateSession`);
    const { session } = await res.json();
    history.push(`/game/${session}`);
  };
  return (
    <>
      <header className={styles.home_header}>
        <div>
          <h1>CODENAMES</h1>
        </div>
      </header>
      <main className={styles.main}>
        <Router>
          <button onClick={handleClick} className={styles.start_button}>
            Start Game
          </button>
        </Router>
      </main>
      <footer></footer>
    </>
  );
}

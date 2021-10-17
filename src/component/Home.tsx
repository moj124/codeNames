import styles from "./Home.module.css";
// import {useState} from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
export function Home(): JSX.Element {
  // const [viewable,setViewable] = useState<boolean>(true);

  const history = useHistory();
  const handleClick = async () => {
    const res = await fetch(`${process.env.REACT_APP_API}/generateSession`);
    const { session } = await res.json();
    history.push(`/game/${session}`);
  };

  // const handleClickRules = () => {
  //   setViewable(!viewable);
  // };

  return (
    <>
      <header className={styles.home_header}>
        <div>
          <h1>CODENAMES</h1>
        </div>
        {/* <div className={styles.content_head}>
          <button className={styles.collapsible} onClick={handleClickRules}>Game Rules</button>
          {viewable ? 
          <div className={styles.viewable_content}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
              maxime dolore deleniti numquam accusamus voluptates, explicabo
              aliquam architecto necessitatibus id itaque accusantium
              consectetur a aut expedita, nemo iusto dicta esse.
            </p>
          </div>
          :  <div className={styles.hide_content}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde
            maxime dolore deleniti numquam accusamus voluptates, explicabo
            aliquam architecto necessitatibus id itaque accusantium
            consectetur a aut expedita, nemo iusto dicta esse.
          </p>
        </div>}
        </div> */}
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

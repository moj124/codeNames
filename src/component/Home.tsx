import { generateWords } from "../utils/generateWords";
import { shuffle } from "../utils/shuffle";
import styles from "./Home.module.css";

export function Home(): JSX.Element{
    const handleClick = async () => {
        // e.preventDefault();



        const res = await fetch(
            `https://nameless-earth-29523.herokuapp.com/generateSession`
          );
        const{ session } = await res.json();
        console.log(session);
        // fetch("https://nameless-earth-29523.herokuapp.com/", {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     // word_id: id
        //     // word: word,
        //     // color: color,
        //     // ishidden: ishidden
        //   }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Success:", data);
        //     // window.location.reload();
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
    }

    return(
    <>
      <header>
        <h1>CODENAMES</h1>
      </header>
      <main>
        <button onClick={handleClick}>Start</button>
      </main>
      <footer>

      </footer>
    </>
    );
}
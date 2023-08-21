import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [genreInput, setGenreInput] = useState("");
  const [result, setResult] = useState([]);
  const [useAnimeName, setUseAnimeName] = useState(true);
  const buttonText = useAnimeName ? "Switch to Similar Anime" : "Switch to Genres";

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const prompt = useAnimeName
        ? "Suggest three anime that have all the genres."
        : "Suggest three anime that are similar to the input but are not the same.";
  
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ genre: genreInput, prompt }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      setResult(data.result); // Assuming data.result is an array of objects with anime names and descriptions
      setGenreInput("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  const togglePrompt = () => {
    setUseAnimeName((prevValue) => !prevValue);
  };

  return (
    <div>
      <Head>
        <title>Anime Recommender</title>
        <link rel="icon" href="/anime.png" />
      </Head>

      <main className={styles.main}>
        <img src="/anime.png" className={styles.icon} />
        <h3>Anime Recommender</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="genres"
            placeholder={useAnimeName ? "Enter some genres" : "Enter an anime name"}
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
          />
          <input type="submit" value="Generate Anime!" />
        </form>
        <button className={styles.switchButton} onClick={togglePrompt}>
          {buttonText}
        </button>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
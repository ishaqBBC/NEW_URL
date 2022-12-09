import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [businessInput, setBusinessInput] = useState("");
  const [results, setResults] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    if (businessInput.length) {
      const speak = `${results ?? results?.join()} ${businessInput} `;
  
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          business: speak,
        }),
      });

      const data = await response.json();
      const newResult = [...results, data.result];
      setResults(newResult);
      setBusinessInput("");
    }
  }
  const clear = (event) => {
    setResults([]);
  };
  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/suit.jpeg" />
      </Head>

      <main className={styles.main}>
        <img src="/suit.jpeg" className={styles.icon} />
        <h3>How to say it at work</h3>
        <form onSubmit={onSubmit} autoComplete="off">
          <input
            type="text"
            name="business"
            placeholder="What do you really want to say..."
            value={businessInput}
            onChange={(e) => setBusinessInput(e.target.value)}
          />
          <input type="submit" value="Generate the shtick" />
          <input
            type="button"
            value="Clear"
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              fontFamily: '"ColfaxAI", Helvetica, sans-serif',
              padding: "12px 0",
              color: "#fff",
              backgroundColor: "#a3104d",
              border: "none",
              borderRadius: "4px",
              textAlign: "center",
              cursor: "pointer",
              marginTop: "2rem",
            }}
            onClick={clear}
          />
        </form>
        <div
          style={{
            fontWeight: "bold",
            marginTop: "40px",
            width: "100%",
            textAlign: "center",
            height: "100%;",
          }}
        >
          {results.map((r) => r)}
        </div>
      </main>
    </div>
  );
}

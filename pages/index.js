import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [businessInput, setBusinessInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        business: `${result ?? result?.split()} ${businessInput}`,
      }),
    });
    const data = await response.json();
    const newResult = [...result, data.result];
    setResult(newResult);
  }
  const clear = (event) => {
    setResult([]);
    setBusinessInput("");
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
            placeholder="Enter  business speak"
            value={businessInput}
            onChange={(e) => setBusinessInput(e.target.value)}
          />
          <input type="submit" value="Generate the shtick" />
          <input type="button" value="Clear" onClick={clear} />
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
          {result.map((r) => r)}
        </div>
      </main>
    </div>
  );
}

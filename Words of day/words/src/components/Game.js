import React, { useState } from "react"; // useState is a hook
import Play from "./Play";

export default function Game() {
  const [word, setWord] = useState(""); // useState is a hook
  const [wordList, setWordList] = useState([]); // useState is a hook
  const [keypressed, setKeypressed] = useState(false); // useState is a hook
  const [play, setPlay] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const btnStyle = {
    height: "42px",
    width: "103px",
    background: "transparent",
    border: "2px white solid",
    color: "white"
  };
  const hoverBtnStyle = {
    height: "42px",
    width: "103px",
    background: "white",
    border: "2px white solid",
    color: "black",
    pointer: "cursor",
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      fetch(`http://localhost:8001/api/insert?q=${word}`)
        .then((res) => {
          if (res.status === 200) {
            console.log("Inserted");
          } else {
            console.log("Error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setWordList([...wordList, word]);
      setWord("");
    }
  };

  const handleChange = (event) => {
    setWord(event.target.value);
  };

  const styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "row",
    fontSize: "30px",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    flexWrap: "wrap",
  };
  return (
    <div>
      <div style={styles}>
        <label for="word">Enter word here: </label>
        <input
          style={{ width: "600px", margin: "12px", height: "22px" }}
          type="text"
          value={word}
          onChange={handleChange}
          onKeyDown={handleKeyPressed}
        />
      </div>
      <div style={styles}>
        <ul>
          {wordList.map((word) => {
            return <li>{word}</li>;
          })}
        </ul>
      </div>
      <div style={styles}>
        {!play && 
        <button
          onClick={() => setPlay(true)}
          style={isHovered ? hoverBtnStyle : btnStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Play!!
        </button>}
        {play && <Play setPlay={setPlay} />}
      </div>
    </div>
  );
}

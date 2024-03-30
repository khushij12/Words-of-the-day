import React, { useState,useEffect } from "react";

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

const btnStyle = {
  height: "42px",
  width: "103px",
  background: "transparent",
  border: "2px white solid",
  color: "white",
};

const hoverBtnStyle = {
    height: "42px",
    width: "103px",
    background: "white",
    border: "2px white solid",
    color: "black",
    pointer: "cursor",
  };


export default function Play({ setPlay }) {
  const [list, setList] = useState([]);
  const [hover, setHover] = useState(false);

  let limit = 10;
  useEffect(() => {
    fetch("http://localhost:8001/api/get")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        console.log(data);
      });
  }, []);

  return (
    <div style={{ styles }}>
        <div style={{    position: 'absolute',
    top: '1933px',
    left: '44px'}}>
      <button
        onClick={() => {
          setPlay(false);
        }}
        style={hover ? hoverBtnStyle : btnStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Back
      </button></div>
      {list.map((item, index) => {
        if (index >= 10) return;
        return <div>{item}</div>;
      })}
    </div>
  );
}

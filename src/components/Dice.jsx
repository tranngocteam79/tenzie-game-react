import React from "react";
export default function Dice(props) {
  function genDiceFace(numOfDots) {
    console.log(numOfDots);
    return (
      <div className="dots-container" data-dot={numOfDots}>
        {[...new Array(numOfDots)].map(() => (
          <span className="dot"></span>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={props.holdDieHandler}
        className={`dice-face ${props.isHeld ? "dice-face--held" : ""}`}
      >
        {genDiceFace(props.value)}
      </div>
    </div>
  );
}

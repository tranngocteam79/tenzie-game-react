import React, { useEffect } from "react";
import Dice from "./components/Dice.jsx";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
function App() {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);
  const [numOfRoll, setNumOfRoll] = React.useState(1);
  const [finishTime, setFinishTime] = React.useState(new Date());
  const [highScore, setHighScore] = React.useState(
    localStorage.getItem("highScore") || Infinity
  );
  const { width, height } = useWindowSize();

  useEffect(() => {
    let tenziesVal = dice[0].value;
    for (let i = 0; i < dice.length; i++) {
      if (dice[i].isHeld && dice[i].value === tenziesVal) {
        if (i === dice.length - 1) {
          setTenzies(true);
          setFinishTime((oldTime) => new Date() - oldTime);
        }
      } else break;
    }
  }, [dice]);

  useEffect(() => {
    // prevent setHighScore to new Date() in miliseconds value when first time render component
    if (!tenzies) return;

    setHighScore((oldHighScore) => {
      const currentHighScore = Math.min(oldHighScore, finishTime);
      localStorage.setItem("highScore", currentHighScore);
      return currentHighScore;
    });
  }, [finishTime]);

  function allNewDice() {
    return [...new Array(10)].map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      setNumOfRoll(1);
      setFinishTime(new Date());
      return;
    }
    setNumOfRoll((oldNumOfRoll) => oldNumOfRoll + 1);
    setDice((oldDice) =>
      oldDice.map((diceFace) => {
        return !diceFace.isHeld
          ? { ...diceFace, value: Math.ceil(Math.random() * 6) }
          : diceFace;
      })
    );
  }
  function holdDice(diceId) {
    setDice((oldDice) =>
      oldDice.map((diceFace) => {
        if (diceFace.id === diceId)
          return { ...diceFace, isHeld: !diceFace.isHeld };
        return diceFace;
      })
    );
  }

  function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <>
      {tenzies && <Confetti width={width} height={height} />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <section className="dice-container">
          {dice.map((diceNum) => (
            <Dice
              key={diceNum.id}
              value={diceNum.value}
              isHeld={diceNum.isHeld}
              holdDieHandler={() => holdDice(diceNum.id)}
            />
          ))}
        </section>

        <button className="roll-dice-btn" onClick={() => rollDice()}>
          {tenzies ? "New Game" : "Roll Dice"}
        </button>
        {tenzies && (
          <>
            <h3 className="winner-announcement-title">{`🏆 You won with ${numOfRoll} rolls`}</h3>
            <small className="winner-finish-time">
              Finish Time : {millisToMinutesAndSeconds(finishTime)}
            </small>
          </>
        )}
        {highScore !== Infinity && (
          <p className="high-score">
            🎯 High score to beat: {millisToMinutesAndSeconds(highScore)}
          </p>
        )}
      </main>
    </>
  );
}

export default App;

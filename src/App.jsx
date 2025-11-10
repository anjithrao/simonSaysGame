// 
// App.jsx - Fixed Version
import React, { useState, useEffect } from 'react';
import Test1 from './component/Test1';
import './App.css';

function App() {
  const [level, setLevel] = useState(1);
  const [blinkingBoxes, setBlinkingBoxes] = useState([]);
  const [userClicks, setUserClicks] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // NEW: Track if game started
  const [showingPattern, setShowingPattern] = useState(false); // NEW: Prevent clicks during pattern show
  const [currentBlinkIndex, setCurrentBlinkIndex] = useState(-1); // NEW: Which box is currently blinking
  const [score,setScore]=useState(0);

  useEffect(() => {
    if (gameStarted) { // Only generate when game is started
      generateBlinkingBoxes(level);
      setGameOver(false);
    }
  }, [level, gameStarted]);

  // NEW: Show boxes one by one when blinkingBoxes changes
  useEffect(() => {
    if (blinkingBoxes.length > 0) {
      showBoxesSequentially();
    }
  }, [blinkingBoxes]);


  function generateBlinkingBoxes(count) {
    const uniqueIndices = new Set();
    while (uniqueIndices.size < count) {
      uniqueIndices.add(Math.floor(Math.random() * 9));
    }
    const newBlinkingBoxes = [...uniqueIndices];
    setBlinkingBoxes(newBlinkingBoxes);
    setUserClicks([]);
    console.log("Generated sequence:", newBlinkingBoxes); // FIXED: This will now show correct values
  }

  // NEW: Show boxes one by one instead of all at once
  function showBoxesSequentially() {
    setShowingPattern(true);
    setCurrentBlinkIndex(-1);

    blinkingBoxes.forEach((boxIndex, i) => {
      setTimeout(() => {
        setCurrentBlinkIndex(boxIndex);
        setTimeout(() => {
          setCurrentBlinkIndex(-1);
          // If this was the last box, allow user to start clicking
          if (i === blinkingBoxes.length - 1) {
            setShowingPattern(false);
          }
        }, 800); // Each box blinks for 800ms
      }, i * 1200); // 1200ms delay between each box
    });
  }

  // NEW: Start game function
  function startGame() {
    setGameStarted(true);
    setLevel(1);
    setGameOver(false);
    setUserClicks([]);
  }
  
  function handleBoxClick(index) {
    if (gameOver || showingPattern) return; // FIXED: Don't allow clicks during pattern show

    const newClicks = [...userClicks, index];
    setUserClicks(newClicks);

    const isCorrect = blinkingBoxes[newClicks.length - 1] === index;
    if (!isCorrect) {
      setGameOver(true);
      return;
    }

    if (newClicks.length === blinkingBoxes.length) {
      // Delay to show success before next level
      setTimeout(() => {
        setScore((score)=>score+1);
        setLevel((prev) => prev + 1);
      }, 800);
    }
  }

  return (
    <div className="app">
      <h2 className="text-center mt-4">Memory Game</h2>
      <div className="text-center">Level: {level}</div>
      
      {/* NEW: Game buttons */}
      {!gameStarted && (
        <div className="text-center mb-3">
          <button className="btn btn-success" onClick={startGame}>
            Play Game
          </button>
        </div>
      )}
      
      {gameOver && (
        <div className="text-center mb-3">
          <div className="text-danger mb-2">Game Over!</div>
          <h1>score is {score}</h1>
            {setScore(0)}
          <button className="btn btn-primary" onClick={startGame}>
            Play Again
          </button>
        </div>
      )}
      
      {/* Show status only during active game */}
      {gameStarted && !gameOver && showingPattern && <div className="text-center text-warning">Watch the pattern...</div>}
      {gameStarted && !gameOver && !showingPattern && <div className="text-center text-info">Your turn!</div>}

      <div className="x1 bg-dark">
        <div className="row">
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="col-4" key={i}>
              <Test1
                number={i + 1}
                index={i}
                isBlinking={currentBlinkIndex === i} // FIXED: Only one box blinks at a time
                handleClick={handleBoxClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
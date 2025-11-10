import React, { useState, useEffect } from 'react';

// Box component - handles individual box rendering and blinking
function Box({ index, isActive, onClick }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (isActive) {
      setIsBlinking(true);
      const timer = setTimeout(() => setIsBlinking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div
      className={`w-20 h-20 m-1 flex items-center justify-center text-white text-xl font-bold cursor-pointer rounded transition-all duration-300 ${
        isBlinking ? 'bg-green-400 scale-110' : 'bg-red-500 hover:bg-red-400'
      }`}
      onClick={() => onClick(index)}
    >
      {index + 1}
    </div>
  );
}

// Main game component
function SimonSaysGame() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeBox, setActiveBox] = useState(-1);

  // Generate new sequence when level changes
  useEffect(() => {
    generateSequence();
  }, [level]);

  // Show sequence to player
  useEffect(() => {
    if (sequence.length > 0) {
      showSequence();
    }
  }, [sequence]);

  function generateSequence() {
    const newSequence = [];
    for (let i = 0; i < level; i++) {
      newSequence.push(Math.floor(Math.random() * 9));
    }
    setSequence(newSequence);
    setUserInput([]);
    setGameOver(false);
  }

  function showSequence() {
    setShowingSequence(true);
    setActiveBox(-1);
    
    sequence.forEach((boxIndex, i) => {
      setTimeout(() => {
        setActiveBox(boxIndex);
        setTimeout(() => {
          setActiveBox(-1);
          if (i === sequence.length - 1) {
            setShowingSequence(false);
          }
        }, 600);
      }, i * 800);
    });
  }

  function handleBoxClick(index) {
    if (gameOver || showingSequence) return;

    const newUserInput = [...userInput, index];
    setUserInput(newUserInput);

    // Check if click is correct
    if (sequence[newUserInput.length - 1] !== index) {
      setGameOver(true);
      return;
    }

    // Check if sequence is complete
    if (newUserInput.length === sequence.length) {
      setTimeout(() => {
        setLevel(prev => prev + 1);
      }, 1000);
    }
  }

  function resetGame() {
    setLevel(1);
    setSequence([]);
    setUserInput([]);
    setGameOver(false);
    setShowingSequence(false);
    setActiveBox(-1);
  }

  return (
    <div className="flex flex-col items-center p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">Simon Says</h1>
      <div className="text-xl mb-4">Level: {level}</div>
      
      {gameOver && (
        <div className="text-red-400 text-xl mb-4">
          Game Over! You reached level {level}
        </div>
      )}
      
      {showingSequence && (
        <div className="text-yellow-400 text-lg mb-4">
          Watch the sequence...
        </div>
      )}
      
      {!showingSequence && !gameOver && userInput.length < sequence.length && (
        <div className="text-green-400 text-lg mb-4">
          Your turn! ({userInput.length + 1}/{sequence.length})
        </div>
      )}

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Box
            key={index}
            index={index}
            isActive={activeBox === index}
            onClick={handleBoxClick}
          />
        ))}
      </div>

      {gameOver && (
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default SimonSaysGame;
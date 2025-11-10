// Test1.jsx - Fixed Version
import React, { useEffect, useState } from 'react';
import '../component/test1.css';

function Test1({ number, index, isBlinking, handleClick }) {
  const [bgColor, setBgColor] = useState('rgb(255,0,0)'); // Default red
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const [isClicked, setIsClicked] = useState(false);   // Track click state
  
  useEffect(() => {
    if (isBlinking) {
      // FIXED: Store original color properly
      const originalColor = 'rgb(255,0,0)'; // Red
      const blinkColor = 'rgb(0,255,0)';    // Green
      
      setBgColor(blinkColor); // Change to green
      
      const timeout = setTimeout(() => {
        setBgColor(originalColor); // Back to red
      }, 800); // FIXED: Match the timing from App.jsx
      
      return () => clearTimeout(timeout);
    } else {
      // FIXED: Reset to red when not blinking
      setBgColor('rgb(255,0,0)');
    }
  }, [isBlinking]);

  // Determine final color based on states
  function getFinalColor() {
    if (isBlinking) return 'rgb(0,255,0)';    // Green when blinking (highest priority)
    if (isClicked) return 'rgb(0,0,255)';     // Blue when clicked
    if (isHovered) return 'rgb(255,255,0)';   // Yellow when hovered
    return bgColor;                           // Default red
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  function handleBoxClick() {
    setIsClicked(true);
    handleClick(index);
    
    // Reset click effect after a short time
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  }

  // REMOVED: generateRandom function (not needed)

  return (
    <div>
      <div
        className="box m-2 text-center text-light fs-3"
        style={{ 
          backgroundColor: getFinalColor(),
          cursor: 'pointer',
          transition: 'background-color 0.2s ease' // Smooth color transitions
        }}
        onClick={handleBoxClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {number}
      </div>
    </div>
  );
}

export default Test1;
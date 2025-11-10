// components/GameBox.jsx
import React from 'react';

function GameBox({ number, isBlinking, onClick }) {
  // Simple box styling
  const boxStyle = {
    width: '80px',
    height: '80px',
    backgroundColor: isBlinking ? 'green' : 'red',  // Green when blinking, red otherwise
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px'
  };

  return (
    <div style={boxStyle} onClick={onClick}>
      {number}
    </div>
  );
}

export default GameBox;
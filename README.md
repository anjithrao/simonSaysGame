# Simon Says Memory Game (React)

# Overview

This is a React-based memory game inspired by the classic “Simon Says.”
The objective is to remember and repeat an increasingly complex sequence of highlighted boxes. Each round adds a new element to the sequence, testing the player’s memory and focus.

# Features

Interactive 9-box grid.

Progressive level system that increases difficulty.

Dynamic sequence generation using random numbers.

Color animations to indicate sequence playback.

Visual feedback for hovering, clicking, and blinking states.

Simple and responsive UI built with React Hooks and CSS transitions.

Game over and restart functionality with score tracking.

# How to Play

Click "Play Game" to start.

Watch carefully as boxes blink in a sequence.

Once the sequence finishes, reproduce it by clicking the boxes in the same order.

If you succeed, the game progresses to the next level with a longer sequence.

A wrong click ends the game — you can start again with "Play Again".

# Project Structure

src/
│
├── App.jsx # Main game logic and UI
├── App.css # Main styling
├── GameBox.jsx # (Optional) related component
├── index.css # Global styles
├── main.jsx # React entry point
│
├── assets/
│ └── react.svg # Default React asset
│
└── component/
├── Simonsays.jsx # Additional component (if used)
├── Test1.jsx # Single box component with visual behavior
└── test1.css # Styling for Test1 component

# Core Components

App.jsx

Manages the game state, including:

Level tracking

Sequence generation and playback

User input validation

Game over logic

Uses React hooks (useState, useEffect) for reactive updates.

Test1.jsx

Represents a single interactive box.

Handles:

Blinking (green)

Hovering (yellow)

Clicking (blue)

Default (red)

Smooth color transitions via CSS.

Technologies Used

React 18+

JavaScript (ES6+)

Bootstrap (for layout and basic styling)

Custom CSS for transitions and effects

# Installation and Setup

1. Clone the Repository
   git clone https://github.com/yourusername/simon-says-react.git
   cd simon-says-react

2. Install Dependencies
   npm install

3. Start the Development Server
   npm run dev

Then open the provided local URL (usually http://localhost:5173/) in your browser.

Build for Production

To create an optimized build:

npm run build

The production-ready files will be in the dist/ directory.

# Future Improvements

Add sound effects for each blink and click.

Implement difficulty modes (e.g., Easy, Medium, Hard).

Add leaderboard or scoring persistence.

Improve mobile responsiveness.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

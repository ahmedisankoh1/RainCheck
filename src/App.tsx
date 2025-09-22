import React from 'react';
import Home from './pages/Home';
import './App.css';

/**
 * Main App Component
 * Entry point for RainCheck weather dashboard application
 * Renders the main Home page with all weather components
 */
function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GameDetails from './pages/GameDetails';
import Navbar from './components/Navbar';

// light/dark theme toggle
// single game page
// dropdown menu of matches on search input
// add loaders between data fetching
// remove filterCategory from an array when dispatching removeFilter if it ends up not needed
// on Home page click clear search input
// change name to Games Vault

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/games/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  )  
}

export default App;
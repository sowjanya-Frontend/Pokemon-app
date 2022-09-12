import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoadPokemon from './Components/Pokemon/LoadPokemon';
import PokemonDetails from './Components/Pokemon/PokemonDetails';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoadPokemon />} />
            <Route path="/pokemonDetails" element={<PokemonDetails />} />
          </Routes>
        </div>
      </Router>

    </React.Fragment>

  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom
import PokeList from './Components/PokeList';
import PokeFavorites from './Components/PokeFavorites';
import 'bootstrap/dist/css/bootstrap.css';

function App() {



    return (
        <Router>
            <Routes>
                <Route path="/" element={<PokeList />} />
                <Route path="/poke" element={<PokeFavorites />} />
            </Routes>
        </Router>
    );
}

export default App;

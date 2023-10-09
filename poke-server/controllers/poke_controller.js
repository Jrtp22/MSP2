const express = require('express');
const poke = express.Router();
const PokeModel = require('../models/pokeModel.js'); 

// INDEX - Fetch all favorite Pokémon
poke.get('/', async (req, res) => {
  try {
    const favorites = await PokeModel.find(); 
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not retrieve favorites' });
  }
});

module.exports = poke;

const express = require('express')
const poke = express.Router()
const pokeModel = require('../models/pokeModel.js')

// INDEX
poke.get('/', (req, res) => {
  res.send(pokeModel)
})

module.exports = poke

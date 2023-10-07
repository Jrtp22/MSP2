// DEPENDENCIES
const express = require('express')
const poke = express.Router()

// CONFIGURATION
require('dotenv').config()
const PORT = process.env.PORT
const app = express()
const mongoose = require('mongoose')
//const bodyParser = require('body-parser')

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about poke')
})

// poke
const pokeController = require('./controllers/poke_controller.js')
app.use('/poke', pokeController)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
)

// Route for adding a Pokémon to favorites
app.post('/poke', async (req, res) => {
    try {
        const { name, abilities, forms, moves, species } = req.body;
        const newFavorite = await FavoritePokemon.create({
            name,
            abilities,
            forms,
            moves,
            species,
        });

        res.json(newFavorite); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not add Pokemon to favorites' });
    }
});

// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

// app.use(express.static(poke-slay));

// app.use(bodyParser.urlencoded({ extended: true }))

//app.get("/", (req, res) => {  res.sendFile(poke-slay + "/index.html");});


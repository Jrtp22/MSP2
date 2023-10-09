const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const pokeController = require('./controllers/poke_controller.js');
const PokeModel = require('./models/pokeModel.js');
const path = require("path");

// Middleware and route for JSON parsing
app.use(express.json());
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, '..', 'poke-slay')));

// ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'poke-slay', 'index.js'));
});

// poke
app.use('/poke', pokeController);

// Route for adding a Pokémon to favorites
app.post('/poke', async (req, res) => {
    try {
        const { name, abilities, forms, moves, species } = req.body;
        const newFavorite = await PokeModel.create({ // Use PokeModel to create a new entry
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
app.listen(process.env.PORT)

// app.use(express.static(poke-slay));

// app.use(bodyParser.urlencoded({ extended: true }))

//app.get("/", (req, res) => {  res.sendFile(poke-slay + "/index.html");});


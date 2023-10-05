// DEPENDENCIES
const express = require('express')

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


// LISTEN
app.listen(PORT, () => {
    console.log('listening on port', PORT);
})

// app.use(express.static(poke-slay));

// app.use(bodyParser.urlencoded({ extended: true }))

//app.get("/", (req, res) => {  res.sendFile(poke-slay + "/index.html");});


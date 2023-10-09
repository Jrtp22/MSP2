//import mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
//create a shorthand schema constructor
const { Schema } = mongoose;

//create a schema
const pokeSchema = new Schema({
    name: { type: String, required: true },
    species: {
      name: String, // Include the name property for the species
    },
    abilities: [String],
    forms: [String],
    moves: [String],
})

const PokeModel = mongoose.model("PokeModel", pokeSchema);

module.exports = PokeModel
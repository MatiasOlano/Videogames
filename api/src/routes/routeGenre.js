const express = require("express");
const { Genre } = require("../db");
const { getGenres } = require("../controllers/apiInfo.js");

const routeGenre = express.Router();

// GET

routeGenre.get("/genres", async (req, res) => {
  try {
    // OBTENE LOS GENRES DE LA DB
    const allGenres = await Genre.findAll();
    // RETORNA LOS GENRES DE LA DB
    res.status(200).json(allGenres);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = routeGenre; // EXPORTAMOS HACIA INDEX.JS

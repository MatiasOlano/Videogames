const express = require("express");
const { Videogame, Genre } = require("../db");
const { getGames, getGamesId } = require("../controllers/apiInfo.js");

const routeVideogame = express.Router();

// GET

routeVideogame.get("/games", async (req, res) => {
  // OBTENEMOS EL NAME POR QUERY
  const { name } = req.query;
  try {
    // GUARDAMOS TODOS LOS GAMES QUE VIENEN DESDE EL CONTROLLER
    const allGames = await getGames();
    if (name) {
      // SI TIENE NAME FILTRA Y NO IMPORTA SI ESCRIBIMOS CON MAYSCULAS O MINUSCULAS LO BUSCA IGUAL
      const nameGame = allGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      // VA A PREGUNTAR SI ENCONTRO EL JUEGO CON ESE NAME
      nameGame.length
        ? // SI LO ENCONTRO RETORNALO
          res.status(200).json(nameGame)
        : // SI NO LO ENCONTRO RETORNA EL MENSAJE DE ERROR
          res
            .status(404)
            .send("Cann't find the game with the name you are looking for");
    } else {
      // SI NO PONE NAME NI NADA RETORNA TODOS LOS VIDEOGAMES
      res.status(200).json(allGames);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

routeVideogame.get("/games/:id", async (req, res) => {
  // RECIBE EL ID POR PARAMS
  const { id } = req.params;
  try {
    const gameId = await getGamesId(id);
    res.status(200).json(gameId);
  } catch (error) {
    res.status(404).json(error);
  }
});

// POST

routeVideogame.post("/games", async (req, res) => {
  // OBTENEMOS LA INFO DEL BODY
  const { name, description, platforms, image, released, rating, genres } =
    req.body;
  try {
    // CREAMOS EL VIDEOGAME EN LA DB
    const newGame = await Videogame.create({
      name: name,
      description: description,
      platforms: platforms,
      image: image,
      released: released,
      rating: rating,
    });
    // BUSCAMOS EL GENRE EN LA DB CON EL NAME QUE SE LE INDICA
    const genresDB = await Genre.findAll({
      where: {
        name: genres,
      },
    });
    // AGREGAMOS EL GENRE QUE ENCONTRO AL NEW GAME
    newGame.addGenres(genresDB);
    // RETORNAMOS EL NEW GAME
    res.status(200).json(newGame);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = routeVideogame; // EXPORTAMOS HACIA INDEX.JS

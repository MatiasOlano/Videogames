const axios = require("axios"); // IMPORTAMOS AXIOS PARA PODER HACERLES GET A LAS URL
const { Videogame, Genre } = require("../db"); // TENEMOS QUE IMPORTAR TAMBIEN LOS MODELOS PARA PODER HACER FINDALL O CREATE, ETC
const { API_KEY } = process.env; //IMPORTAMOS LA API_KEY PARA PODER HACERLES PEDIDOS A LA API

const getGames = async () => {
  // HACEMOS UN BUCLE FOR YA QUE LA API CONTIENE PAGINADO DONDE CADA PAGINA CONTIENE 20 JUEGOS, HACEMOS 5 VUELTAS PARA PODER LOGRAR TENER 100 JUEGOS
  let apiurls = []; // ACA SE ALMACENAN LAS PAGINAS, LA PRIMERA CONTIENE LOS PRIMEROS 20 JUEGOS LA SEGUNDA LOS OTROS 20 Y ASI SUCESIVAMENTE
  for (let i = 1; i <= 5; i++) {
    apiurls = [
      ...apiurls,
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`,
    ];
  }
  // UNA VEZ QUE TENEMOS LAS URL DONDE LES VAMOS A HACER EL PEDIDO HACEMOS UN MAP SOBRE LAS URL Y POR CADA URL HACER UN GET PARA OBTENER LA INFORMACION
  let api = apiurls.map((url) => axios.get(url));
  // ENCERRAMOS TODO EN UN PROMISE.ALL PARA VERIFICAR QUE TODAS LAS URL SE EJECUTEN CORRECTAMENTE Y PUEDA PASAR AL MAPEADO DE LA INFORMACION
  api = await Promise.all(api);
  // OBTENEMOS LOS DATOS CON EL .DATA.RESULTLS Y EL FLAT ME PERMITE OBTENER INFORMACION DE OBJETOS ANIDADOS "APLANA LA MATRIZ"
  api = api?.map((response) => response.data.results).flat();
  // DESPUES HACEMOS OTRO MAP DE TODO LO QUE NOS VINO Y POR CADA GAME QUE RETORNE EL ID, NAME, GENRES, PLATFORMS, RELEASED, IMAGE, RATINGS
  api = api?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      genres: game.genres?.map((gen) => gen.name),
      platforms: game.platforms?.map((plat) => plat.platform.name),
      released: game.released,
      image: game.background_image,
      rating: game.rating,
    };
  });
  // TAMBIEN TENEMOS QUE BUSCAR LOS JUEGOS CREADOS EN LA BASE DE DATOS INCLUYENDO EL MODELO DE GENRE CON EL ATRIBUTO DEL NOMBRE
  let gamesdb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  // UNA VEZ ENCONTRAMOS LOS JUEGOS DEVOLVEMOS LA INFORMACION QUE NECESITAMOS
  gamesdb = gamesdb?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      genres: game.genres?.map((gen) => gen.name),
      platforms: game.platforms,
      released: game.released,
      image: game.image,
      rating: game.rating,
      description: game.description,
    };
  });
  // RETORNAMOS LOS JUEGOS DE LA API + LOS JUEGOS DE LA DB Y SU INFORMACION
  return [...api, ...gamesdb];
};

const getGamesId = async (id) => {
  if (id.includes("-")) {
    let gameDb = await Videogame.findOne({
      where: {
        id: id,
      },
      include: [Genre],
    });

    const dbGameId = {
      id: gameDb.dataValues.id,
      name: gameDb.dataValues.name,
      genres: gameDb.dataValues.genres?.map((gen) => gen.name),
      platforms: gameDb.dataValues.platforms,
      released: gameDb.dataValues.released,
      image: gameDb.dataValues.image,
      rating: gameDb.dataValues.rating,
      description: gameDb.dataValues.description,
    };

    return dbGameId;
  } else {
    let gameApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    gameApi = gameApi.data;
    const apiGameId = {
      id: gameApi.id,
      name: gameApi.name,
      genres: gameApi.genres?.map((gen) => gen.name),
      platforms: gameApi.platforms?.map((plat) => plat.platform.name),
      released: gameApi.released,
      image: gameApi.background_image,
      rating: gameApi.rating,
      description: gameApi.description,
    };
    return apiGameId;
  }
};

const getGenres = async () => {
  // HACEMOS UN PEDIDO A LA URL DONDE ESTAN TODOS LOS GENRES
  let apiGenres = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
  );
  // OBTENEMOS LA INFORMACION CON EL .DATA.RESULTS
  apiGenres = apiGenres.data.results;
  // A ESA INFORMACION LA MAPEAMOS Y POR CADA GENRE ENCUENTRE O CREE EN LA BASE DE DATOS INCLUYENDO EL NAME
  apiGenres.map(async (genre) => {
    await Genre.findOrCreate({
      where: {
        name: genre.name,
      },
    });
  });
  // HACEMOS UN FINDALL PARA OBTENER TODOS LOS GENRES CON SUS NOMBRES
  let dbGenres = await Genre.findAll();
  // RETORNAMOS LOS GENRES EN LA BASE DE DATOS
  return dbGenres;
};

module.exports = { getGames, getGenres, getGamesId }; // EXPORTAMOS getGames HACIA routeVideogames PARA PODER HACER LOS GET CON NOMBRE E ID
// EXPORTAMOS getGenres HACIA INDEX.JS PARA QUE CUANDO EL SERVIDOR LEVANTE SE CREE LA DB DE GENRES

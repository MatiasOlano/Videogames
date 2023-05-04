const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// MODULARIZAMOS LAS RUTAS

const router = Router();

const routeVideogame = require("./routeVideogame.js");
const routeGenre = require("./routeGenre.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", routeVideogame);
router.use("/", routeGenre);

module.exports = router;

const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRoute = require("./Recipes");
const typeOfDietRoute = require("./TypeOfDiet");
const postRecipeRoute = require("./PostRecipe");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", postRecipeRoute);
router.use("/recipes", recipesRoute);
router.use("/types", typeOfDietRoute);
router.use("/recipes/detalle", recipesRoute);

module.exports = router;

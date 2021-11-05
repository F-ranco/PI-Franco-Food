const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const {
      name,
      summary,
      // diets,
      image,
      healthScore,
      healthyFoodLevel,
      steps,
      diets, // se lo envio por body desde el front y lo relaciona con la tabla intermedia
    } = req.body;
    const newRecipe = await Recipe.create({
      name,
      summary,
      // diets,
      image,
      healthScore,
      healthyFoodLevel,
      steps,
    });

    let dbTypeOfDiet = await Diets.findAll({
      //el tipo de dieta lo creo con lo que ya tengo en mi db
      where: { name: diets },
    });
    newRecipe.addDiets(dbTypeOfDiet);

    res.status(200).send("Receta creada exitosamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

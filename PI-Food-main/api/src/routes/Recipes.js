const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();

router.get("/", async (req, res, next) => {
  let name = req.query.query;
  try {
    let apiUrl;
    let dbInfo;
    let apiInfo;
    if (name) {
      apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`
      );

      apiInfo = apiUrl.data.results.map((e) => {
        return {
          id: e.id,
          name: e.title,
          diets: e.diets,
          image: e.image,
          summary: e.summary,
          healthScore: e.healthScore,
          healthyFoodLevel: e.spoonacularScore, //veryHealthy
          steps: e.analyzedInstructions[0]?.steps.map((e) => {
            return {
              step: e.number + ": " + e.step,
            };
          }),
        };
      });
      dbInfo = await Recipe.findAll({
        // where: {
        //   name: {
        //     [Op.iLike]: "%" + name + "%",
        //   },
        // },
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let allRecipes = [...apiInfo, ...dbInfo];
      res.send(allRecipes);
    } else {
      // return res.status(404).send("No se encontró dicha receta");
      let apiUrl;
      let dbInfo;
      let apiInfo;

      apiUrl = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
      );

      apiInfo = apiUrl.data.results.map((e) => {
        return {
          id: e.id,
          name: e.title,
          summary: e.summary,
          diets: e.diets,
          image: e.image,
          healthScore: e.healthScore,
          healthyFoodLevel: e.spoonacularScore, //veryHealthy
          steps: e.analyzedInstructions[0]?.steps.map((e) => {
            return {
              step: e.number + ": " + e.step,
            };
          }),
        };
      });
      dbInfo = await Recipe.findAll({
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      let allRecipes = [...apiInfo, ...dbInfo];
      res.send(allRecipes);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (typeof id === "string" && id.length > 15) {
      let recipe = await Recipe.findByPk(id, {
        include: {
          model: Diets,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      return res.send(recipe);
    } else {
      let recipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      return res.send(recipe.data);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

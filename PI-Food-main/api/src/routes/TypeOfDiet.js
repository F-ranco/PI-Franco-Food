const axios = require("axios");
const { Router } = require("express");
const { API_KEY } = process.env;
const { Diets } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  let dietas = [
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "paleolithic",
    "primal",
    "pescatarian",
    "fodmap friendly",
    "whole 30",
  ];

  // sin dieta???
  // "Gluten Free",
  // "Ketogenic",
  // "Vegetarian",
  // "Lacto-Vegetarian",
  // "Ovo-Vegetarian",
  // "Vegan",
  // "Pescetarian",
  // "Paleo",
  // "Primal",
  // "Low FODMAP",
  // "Whole30",

  dietas.forEach((e) => {
    let el = e;
    Diets.findOrCreate({
      where: { name: el },
      defaults: {
        name: el,
      },
    });
  });
  let allTypes = await Diets.findAll();
  res.send(allTypes);

  //-----------------------------------------------------------------------------------------------//
  // let infoDB = await TypeOfDiet.findAll();
  // if (!infoDB.length) {
  //   const dietsApi = await axios.get(
  //     `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${API_KEY}&addRecipeInformation=true`
  //   );
  //   const dietsType = dietsApi.data.results.map((e) => e.diets); //arreglo de tipo de dietas
  //   const dietsTypeEach = dietsType.map((el) => {
  //     for (let i = 0; i < el.length; i++) {
  //       return el[i];
  //     }
  //   });
  //   console.log(dietsTypeEach);
  //   dietsTypeEach.forEach((e) => {
  //     TypeOfDiet.findOrCreate({
  //       where: { name: e },
  //       defaults: { name: e },
  //     });
  //   });
  //   const allTypes = await TypeOfDiet.findAll();
  //   return res.send(allTypes);
  // }
  // res.send(infoDB);
});

module.exports = router;

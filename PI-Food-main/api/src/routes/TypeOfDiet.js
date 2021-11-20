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
});

module.exports = router;

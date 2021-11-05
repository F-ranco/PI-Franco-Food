const initialState = {
  recipes: [],
  allRecipes: [],
  typeOfDyet: [], //para el post
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload, //para el filtrado
      };

    case "GET_NAME_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };

    case "FILTER_BY_TYPES":
      const allRecipes = state.allRecipes;
      const typesFiltered =
        action.value === "All"
          ? allRecipes
          : allRecipes.filter((e) => e.diets.includes(action.value));
      return {
        ...state,
        recipes: typesFiltered,
      };
    case "POST_RECIPE":
      return {
        ...state,
      };
    case "GET_TYPES":
      return {
        ...state,
        typeOfDyet: action.payload,
      };
    case "ORDER_BY_SCORE":
      let sortedArray =
        action.value === "Mayor Puntuacion"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return -1;
              if (a.healthScore > b.healthScore) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedArray,
      };
    default:
      return state;
  }
}

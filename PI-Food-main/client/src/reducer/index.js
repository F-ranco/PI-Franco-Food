const initialState = {
  recipes: [],
  allRecipes: [],
  typeOfDyet: [], //para el post
  details: [],
  cargando: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload, //para el filtrado
        cargando: false,
      };
    case "CARGANDO":
      return { ...state, cargando: true };

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
          : allRecipes.filter(
              (e) =>
                e.diets.includes(action.value) ||
                e.diets.map((e) => e.name).includes(action.value)
            );
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
    case "GET_DETAILS":
      return {
        ...state,
        details: action.payload,
        cargando: false,
      };
    case "ORDER_BY_SCORE":
      let sortedArrayScore =
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
        recipes: sortedArrayScore,
      };
    case "ORDER_BY_NAME":
      let sortedArrayName =
        action.value === "ASC"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedArrayName,
      };
    default:
      return state;
  }
}

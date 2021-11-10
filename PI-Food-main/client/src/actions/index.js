import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: info.data,
    });
  };
}

export function getNameRecipes(name) {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/recipes?query=" + name);
    return dispatch({
      type: "GET_NAME_RECIPES",
      payload: info.data,
    });
  };
}

export function getTypes() {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: info.data,
    });
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    var info = await axios.post("http://localhost:3001/recipe", payload);
    return info;
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    var info = await axios.get("http://localhost:3001/recipes/" + id);
    return dispatch({
      type: "GET_DETAILS",
      payload: info.data,
    });
  };
}

export function filterRecipesByTypes(value) {
  return {
    type: "FILTER_BY_TYPES",
    value,
  };
}
export function orderByScore(value) {
  return {
    type: "ORDER_BY_SCORE",
    value,
  };
}
export function orderByName(value) {
  return {
    type: "ORDER_BY_NAME",
    value,
  };
}

import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../../actions";
import "./RecipeCreate.css";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.typeOfDyet);

  const [input, setInput] = useState({
    name: "",
    summary: "",
    diets: [],
    image: "",
    healthScore: "",
    healthyFoodLevel: "",
    steps: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postRecipe(input));
    alert("Receta creada con éxito !");
    setInput({
      name: "",
      summary: "",
      diets: [],
      image: "",
      healthScore: "",
      healthyFoodLevel: "",
      steps: "",
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button className="button">Return</button>
      </Link>
      <h1 id="title">Create your own recipe!</h1>

      <form onSubmit={(e) => handleSubmit(e)} className="Formulario">
        <div className="inputs">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              required="true"
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Score:</label>
            <input
              id="score"
              type="number"
              value={input.healthScore}
              name="healthScore"
              min="0"
              max="100"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Healthy Food Level:</label>
            <input
              id="HealthyFoodLevel"
              type="number"
              value={input.healthyFoodLevel}
              name="healthyFoodLevel"
              min="0"
              max="100"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Summary:</label>
            <input
              type="text"
              value={input.summary}
              name="summary"
              onChange={(e) => handleChange(e)}
              required="true"
            />
          </div>
          <div>
            <label>Steps:</label>
            <input
              type="text"
              value={input.steps}
              name="steps"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className="tipoDeDietas">
          <div>
            <label>Diets:</label>
            <div className="opciones">
              {types.map((e) => (
                <div>
                  <input
                    type="checkbox"
                    value={e.name}
                    name={e.name}
                    onChange={(e) => handleCheck(e)}
                  />
                  <label>{e.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className="button">
          Create Recipe
        </button>
      </form>
    </div>
  );
}

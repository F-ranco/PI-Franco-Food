import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRecipe, getTypes } from "../../actions";

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.typeOfDyet);
  const [errors, setErrors] = useState({});

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
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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

  function validate(input) {
    let errors = {};
    if (!input.name) errors.name = "Campo Obligatorio";
    if (!input.summary) errors.summary = "Campo Obligatorio";
    return errors;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Creá tu propia receta!</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Puntuación:</label>
          <input
            type="text"
            value={input.healthScore}
            name="healthScore"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Nivel de "comida saludable":</label>
          <input
            type="text"
            value={input.healthyFoodLevel}
            name="healthyFoodLevel"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Resumen:</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => handleChange(e)}
          />
          {errors.summary && <p className="error">{errors.summary}</p>}
        </div>
        <div>
          <label>Paso a Paso:</label>
          <input
            type="text"
            value={input.steps}
            name="steps"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {/* <div>
          <label>Tipo de dietas:</label>
          <input type="checkbox" value="Alive" name="Alive" />
        </div> */}
        {/* <select>
          {types.map((e) => (
            <option value={e.name}>{e.name}</option>
          ))}
        </select> */}
        <div>
          <label>Tipo de dietas:</label>
          {types.map((e) => (
            <div>
              <label>{e.name}</label>
              <input
                type="checkbox"
                value={e.name}
                name={e.name}
                onChange={(e) => handleCheck(e)}
              />
            </div>
          ))}
        </div>
        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
}

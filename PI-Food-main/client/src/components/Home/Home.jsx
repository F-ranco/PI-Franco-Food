import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByTypes, orderByScore } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";

export default function Home() {
  const dispatch = useDispatch(); //para llamar a una function
  const allRecipes = useSelector((state) => state.recipes); //para traerme el state, es = mapStateToProps
  // console.log(allRecipes);

  //----------------------paginado--------------------------

  const [currentPage, setCurrentPage] = useState(1); //estado local para la pgina actual
  const [recipesPorPage, setRecipesPorPage] = useState(9); //estado local para guardar cuantas recetas (card) quiero por pagina
  const indexOfLastRecipe = currentPage * recipesPorPage; //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPorPage; //0
  const currentRecipes = allRecipes.slice(
    //const que tiene los personajes de mi pagina actual
    indexOfFirstRecipe, // index 0
    indexOfLastRecipe // index 8
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber); //cambia mi numero de pagina
  };

  //-----------------------------------------------------------

  const [order, setOrder] = useState("ASC"); //estado local para ordenamiento

  useEffect(() => {
    //para renderizar apenas comienza el ciclo de vida del componente, es = componentDidMount
    dispatch(getRecipes()); //este dispatch es = mapDispatchToProps
    console.log(allRecipes);
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
  }

  function handleFilterTypes(e) {
    dispatch(filterRecipesByTypes(e.target.value));
  }
  function handleSortByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div>
      <Link to="/recipe">Crear Receta</Link>
      <h1>Titulo de mi pagina</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todas las recetas
      </button>
      <SearchBar />
      <div>
        <select>
          <option value="ASC">Ascendente</option>
          {/* para enviar la info por payload necesito un value */}
          <option value="DESC">Descendente</option>
        </select>
        <select onChange={(e) => handleSortByScore(e)}>
          <option value="Mayor Puntuacion">Mayor Puntuación</option>
          {/* para enviar la info por payload necesito un value */}
          <option value="Menor Puntuacion">Menor Puntuación</option>
        </select>

        <select onChange={(e) => handleFilterTypes(e)}>
          <option value="All">Todos los tipos</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="vegan">Vegan</option>
          <option value="lacto ovo vegetarian">Lacto-Ovo Vegetarian</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="fodmap friendly">Low FODMAP</option>
          <option value="whole 30">Whole30</option>
        </select>

        <Paginado
          recipesPorPage={recipesPorPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />

        {currentRecipes?.map((e) => {
          return (
            <Link to={"/home/" + e.id}>
              <Card
                key={e.id}
                name={e.name}
                image={
                  e.image
                    ? e.image
                    : "https://ugc.kn3.net/i/760x/http://3.bp.blogspot.com/_HtUqZCoetxE/TI-AEcTItxI/AAAAAAAAABI/0Kr30Fwgnuk/s1600/chef.jpg"
                }
                diets={
                  "Dietas: " +
                  (e.diets ? e.diets : e.diets.map((e) => e.name)) +
                  " ."
                }
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

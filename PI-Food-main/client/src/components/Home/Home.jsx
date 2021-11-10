import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRecipes,
  filterRecipesByTypes,
  orderByScore,
  orderByName,
} from "../../actions";
import { Link, NavLink } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";

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
    setCurrentPage(1);
  }
  function handleSortByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }
  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value}`);
  }

  return (
    <div className="Home">
      <div className="topDiv">
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          id="buttonHome"
        >
          HOME
        </button>
        <div className="navLink">
          <NavLink to="/recipe">Create new recipe</NavLink>
        </div>
        <SearchBar />
      </div>

      <div className="filters">
        <select onChange={(e) => handleSortByName(e)}>
          <option value="ASC">A - Z</option>
          {/* para enviar la info por payload necesito un value */}
          <option value="DESC">Z - A</option>
        </select>
        <select onChange={(e) => handleSortByScore(e)}>
          <option value="Mayor Puntuacion">Highest Score</option>
          {/* para enviar la info por payload necesito un value */}
          <option value="Menor Puntuacion">Lowest Score</option>
        </select>

        <select onChange={(e) => handleFilterTypes(e)}>
          <option value="All">All</option>
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
      </div>

      <div>
        <Paginado
          recipesPorPage={recipesPorPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
      <div className="recipeContainer">
        {currentRecipes.length === 0 ? (
          <h3 id="recipeNotFound">No recipes found</h3>
        ) : (
          currentRecipes?.map((e) => {
            return (
              <div>
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
                      "Diets: " +
                      (!e.createdInDb
                        ? e.diets + " "
                        : e.diets.map((el) => el.name + " ")) +
                      " ."
                    }
                  />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div>
        <Paginado
          recipesPorPage={recipesPorPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}

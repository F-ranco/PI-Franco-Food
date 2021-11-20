import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import Spinner from "../Spinner/Spinner";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const cargando = useSelector((state) => state.cargando);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch]);

  const myRecipe = useSelector((state) => state.details);
  return (
    <div className="Detail">
      {cargando ? (
        <Spinner />
      ) : (
        <div>
          {myRecipe ? (
            <div className="detailContainer">
              <div className="detailContainerUno">
                {myRecipe.title ? (
                  <h1>{myRecipe.title}</h1>
                ) : (
                  <h1>{myRecipe.name}</h1>
                )}
                <img
                  src={
                    myRecipe.image
                      ? myRecipe.image
                      : "https://ugc.kn3.net/i/760x/http://3.bp.blogspot.com/_HtUqZCoetxE/TI-AEcTItxI/AAAAAAAAABI/0Kr30Fwgnuk/s1600/chef.jpg"
                  }
                  alt="img not found"
                  width="280px"
                  height="200px"
                />
                <h2>
                  Healthy Food Level:{" "}
                  {myRecipe.createdInDb
                    ? myRecipe.healthyFoodLevel
                    : myRecipe.healthScore}
                </h2>
                <h2>
                  Score:{" "}
                  {myRecipe.createdInDb
                    ? myRecipe.healthScore
                    : myRecipe.spoonacularScore}
                </h2>
                <h2>
                  Diets:{" "}
                  {!myRecipe.createdInDb
                    ? myRecipe.diets + " "
                    : myRecipe.diets.map((e) => e.name + " ")}
                </h2>
                {myRecipe.dishTypes ? (
                  <h2>Dish Types: {myRecipe.dishTypes + " "}</h2>
                ) : (
                  ""
                )}
              </div>

              <div className="detailContainerDos">
                <p>Summary</p>
                <div dangerouslySetInnerHTML={{ __html: myRecipe.summary }} />
                <p>Instructions</p>

                <div>
                  {myRecipe.createdInDb === true ? (
                    <div>{myRecipe.steps}</div>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: myRecipe.instructions,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <Link to="/home">
            <button id="buttonReturn">Return</button>
          </Link>
        </div>
      )}
    </div>
  );
}

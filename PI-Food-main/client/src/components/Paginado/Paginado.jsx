import React from "react";
import "./Paginado.css";

export default function Paginado({ allRecipes, recipesPorPage, paginado }) {
  const pageNumbers = []; // es para cada div del paginado

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPorPage); i++) {
    // 100/9 = 12
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado">
        {pageNumbers?.map((number) => (
          <li className="number" key={number}>
            <a onClick={() => paginado(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

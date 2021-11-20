import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function Card({ name, image, diets, id }) {
  return (
    <div className="Card">
      <div>
        <h3>{name}</h3>
        <h5>{diets}</h5>
        <img src={image} alt="img not found" width="280px" height="200px" />
        <Link to={"/home/" + id}>
          <button id="Detail">Detail</button>
        </Link>
      </div>
    </div>
  );
}

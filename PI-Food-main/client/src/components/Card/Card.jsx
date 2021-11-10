import React from "react";
import "./Card.css";

export default function Card({ name, image, diets }) {
  return (
    <div className="Card">
      <div>
        <h3>{name}</h3>
        <h5>{diets}</h5>
        <img src={image} alt="img not found" width="280px" height="200px" />
      </div>
    </div>
  );
}

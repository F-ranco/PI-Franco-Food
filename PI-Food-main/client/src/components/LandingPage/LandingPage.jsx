import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="letras">
        <h1>COOK IT YOURSELF!</h1>
        <div className="button">
          <Link to="/home">
            <button>Join Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

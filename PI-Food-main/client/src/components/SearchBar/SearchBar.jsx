import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleChangeInput(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipes(name));
    setName("");
  }

  return (
    <div>
      <input
        id="inputName"
        type="text"
        placeholder="Search By Name..."
        onChange={(e) => handleChangeInput(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)} id="buttonSearch">
        Search
      </button>
    </div>
  );
}

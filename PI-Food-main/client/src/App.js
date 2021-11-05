import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import RecipeCreate from "./components/RecipeCreate/RecipeCreate";
// import Detail from "./components/Detail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/home" component={Home} />
        <Route path="/recipe" component={RecipeCreate} />
        {/* <Route path="/home/:id" component={Detail} /> */}
      </Switch>
      {/* <h1>Henry Food</h1> */}
    </div>
  );
}

export default App;

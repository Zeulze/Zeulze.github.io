import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App.jsx";
import MarvelService from "./services/MarvelService.jsx";
import "./style/style.scss";

const marvelService = new MarvelService();
marvelService
  .getCharacter(1011052)
  .then((data) => console.log(data.data.results));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

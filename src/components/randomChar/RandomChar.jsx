import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useMarvelService from "../../services/MarvelService.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { setContent } from "../../utils/setContent.jsx";

const RandomChar = () => {
  const [randomCharState, setRandomCharState] = useState({
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  });

  const marvelService = useMarvelService();

  function onCharLoaded(char) {
    setRandomCharState(char);
  }

  function updateChar() {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService
      .getCharacter(id)
      .then(onCharLoaded)
      .then(() => marvelService.setProcess("confirmed"));
  }

  function onButtonUpdate() {
    marvelService.clearError();
    updateChar();
  }

  useEffect(updateChar, []);

  return (
    <div className="randomchar">
      {setContent(marvelService.process, View, randomCharState)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          className="button button__main"
          disabled={marvelService.process === "loading"}
        >
          <div className="inner" onClick={onButtonUpdate}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  return (
    <div className="randomchar__block">
      <img
        src={data.thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{data.name}</p>
        <p className="randomchar__descr">{data.description}</p>
        <div className="randomchar__btns">
          <a href={data.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={data.wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

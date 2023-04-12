import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService.jsx";
import { useState } from "react";
import { useEffect } from "react";

const RandomChar = () => {
  const [randomCharState, setRandomCharState] = useState({
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
  });

  const marvelService = new MarvelService();

  function onCharLoaded(char) {
    setRandomCharState(char);
  }

  function updateChar() {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService.getCharacter(id).then(onCharLoaded);
  }
  useEffect(updateChar, []);

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img
          src={randomCharState.thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
        <div className="randomchar__info">
          <p className="randomchar__name">{randomCharState.name}</p>
          <p className="randomchar__descr">{randomCharState.description}</p>
          <div className="randomchar__btns">
            <a href={randomCharState.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={randomCharState.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

export default RandomChar;

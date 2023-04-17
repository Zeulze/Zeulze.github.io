import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService.jsx";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import errorMessage from "../errorMessage/errorMessage.jsx";

const RandomChar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
    setLoading(false);
  }

  function updateChar() {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  useEffect(updateChar, []);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <View char={randomCharState} /> : null;

  return (
    <div className="randomchar">
      {errorMessage || spinner || content}
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

const View = ({ char }) => {
  return (
    <div className="randomchar__block">
      <img
        src={char.thumbnail}
        alt="Random character"
        className="randomchar__img"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{char.name}</p>
        <p className="randomchar__descr">{char.description}</p>
        <div className="randomchar__btns">
          <a href={char.homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={char.wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;

import "./charInfo.scss";
import { useState } from "react";
import { useEffect } from "react";
import MarvelService from "../../services/MarvelService.jsx";
import Spinner from "../spinner/spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";

const CharInfo = ({ selectedChar }) => {
  const [char, setChar] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const service = new MarvelService();

  const onCharLoaded = (data) => {
    setChar(data);
    setLoading(false);
    setError(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const onCharLoading = () => {
    setLoading(true);
  };

  const updateChar = () => {
    if (!selectedChar) {
      return;
    }
    onCharLoading();
    service.getCharacter(selectedChar).then(onCharLoaded).catch(onError);
  };

  useEffect(updateChar, [selectedChar]);

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {content}
      {errorMessage}
      {skeleton}
      {spinner}
    </div>
  );
};

const View = ({ char }) => {
  let content;
  if (char.comics.length) {
    content = char.comics.map((item, index) => {
      if (index > 9) return null;
      return (
        <li className="char__comics-item" key={index}>
          {item.name}
        </li>
      );
    });
  } else {
    content = "There are no comics with this specific character :(";
  }

  return (
    <>
      <div className="char__basics">
        <img src={char.thumbnail} alt={char.name} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a href={char.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={char.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{char.description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{content}</ul>
    </>
  );
};

export default CharInfo;

import "./charInfo.scss";
import { useState } from "react";
import { useEffect } from "react";
import useMarvelService from "../../services/MarvelService.jsx";
import Spinner from "../spinner/spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";

const CharInfo = ({ selectedChar }) => {
  const [char, setChar] = useState(null);
  const service = useMarvelService();

  const onCharLoaded = (data) => {
    setChar(data);
  };

  const updateChar = () => {
    if (!selectedChar) {
      return;
    }

    service.clearError();
    service.getCharacter(selectedChar).then(onCharLoaded).catch();
  };

  useEffect(updateChar, [selectedChar]);

  const skeleton =
    char || service.loading || service.error ? null : <Skeleton />;
  const errorMessage = service.error ? <ErrorMessage /> : null;
  const spinner = service.loading ? <Spinner /> : null;
  const content = !(service.error || service.loading || !char) ? (
    <View char={char} />
  ) : null;

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

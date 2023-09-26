import "./charInfo.scss";
import { useState } from "react";
import { useEffect } from "react";
import useMarvelService from "../../services/MarvelService.jsx";
import { setContent } from "../../utils/setContent.jsx";

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
    service
      .getCharacter(selectedChar)
      .then(onCharLoaded)
      .then(() => service.setProcess("confirmed"));
  };

  useEffect(updateChar, [selectedChar]);

  return (
    <div className="char__info">{setContent(service.process, View, char)}</div>
  );
};

const View = ({ data }) => {
  let content;
  if (data.comics.length) {
    content = data.comics.map((item, index) => {
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
        <img src={data.thumbnail} alt={data.name} />
        <div>
          <div className="char__info-name">{data.name}</div>
          <div className="char__btns">
            <a href={data.homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={data.wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{data.description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{content}</ul>
    </>
  );
};

export default CharInfo;

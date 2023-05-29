import "./charList.scss";
import Spinner from "../spinner/spinner.jsx";
import MarvelService from "../../services/MarvelService.jsx";
import { useEffect, useState } from "react";

const CharList = ({ setSelected }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const service = new MarvelService();

  function onCharListLoaded(charList) {
    const newDataList = charList.map((char) => {
      return (
        <li
          className="char__item"
          key={char.id}
          onClick={() => {
            setSelected(char.id);
          }}
        >
          <img src={char.thumbnail} alt={char.name} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    setData([...data, newDataList]);
    setLoading(false);
  }

  function toUpdate() {
    service.getAllCharacters().then(onCharListLoaded);
  }

  useEffect(toUpdate, []);

  const spinnerContent = () => {
    const spinnerArray = [];
    for (let i = 0; i < 9; i++) {
      spinnerArray.push(
        <li
          className="char__item"
          key={i}
          style={{
            padding: "25% 0",
            backgroundColor: "white",
          }}
        >
          <Spinner />
        </li>
      );
    }

    return spinnerArray;
  };

  const content = loading ? spinnerContent() : data;

  return (
    <div className="char__list">
      <ul className="char__grid">{content}</ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;

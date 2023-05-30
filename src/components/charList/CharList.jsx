import "./charList.scss";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import MarvelService from "../../services/MarvelService.jsx";
import { useEffect, useState } from "react";

const CharList = ({ setSelected }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(210);
  const service = new MarvelService();

  function onError() {
    setLoading(false);
    setError(true);
  }

  function onRequest(offset) {
    onCharListLoading();
    service.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
  }

  function onCharListLoading() {
    setNewItemLoading(true);
  }

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
    setNewItemLoading(false);
    setOffset(() => offset + 9);
    setError(false);
  }

  useEffect(onRequest, []);

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

  const errorContent = () => {
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
          <ErrorMessage />
        </li>
      );
    }

    return spinnerArray;
  };

  const spinner = loading ? spinnerContent() : null;
  const isError = error ? errorContent() : null;
  const content = !loading || error ? data : null;

  return (
    <div className="char__list">
      <ul className="char__grid">{spinner || isError || content}</ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;

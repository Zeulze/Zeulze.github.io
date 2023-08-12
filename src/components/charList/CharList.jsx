import "./charList.scss";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import useMarvelService from "../../services/MarvelService.jsx";
import { useEffect, useState, useRef } from "react";

const CharList = ({ setSelected }) => {
  const [data, setData] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const service = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);
  const itemRefs = useRef([]);

  function onRequest(offset, initial) {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    service.getAllCharacters(offset).then(onCharListLoaded).catch();
  }

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function onCharListLoaded(charList) {
    const newDataList = charList.map((char, index) => {
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={char.id}
          ref={(el) => (itemRefs.current[char.id] = el)}
          onClick={() => {
            setSelected(char.id);
            focusOnItem(char.id);
          }}
        >
          <img src={char.thumbnail} alt={char.name} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    setData([...data, newDataList]);
    setNewItemLoading(false);
    setOffset((prevOffset) => prevOffset + 9);
  }

  const toFillContent = (component) => {
    const content = [];
    for (let i = 0; i < 9; i++) {
      content.push(
        <li
          className="char__item"
          key={i}
          style={{
            padding: "25% 0",
            backgroundColor: "white",
          }}
        >
          {component}
        </li>
      );
    }

    return content;
  };

  const spinner =
    service.loading && !newItemLoading ? toFillContent(<Spinner />) : null;
  const isError = service.error ? toFillContent(<ErrorMessage />) : null;

  return (
    <div className="char__list">
      <ul className="char__grid">{spinner || isError || data}</ul>
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

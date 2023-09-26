import "./charList.scss";
import useMarvelService from "../../services/MarvelService.jsx";
import { useEffect, useRef, useState, useMemo } from "react";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;
    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;
    case "confirmed":
      return <Component />;
    case "error":
      return <ErrorMessage />;
    default:
      throw new Error("Unexpected process state");
  }
};

const CharList = ({ setSelected }) => {
  const [data, setData] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const itemRefs = useRef([]);

  const service = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  function onRequest(offset, initial) {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    service
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => service.setProcess("confirmed"));
  }

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  const onCharListLoaded = (newDataList) => {
    let ended = false;
    if (newDataList.length < 9) ended = true;

    setData([...data, ...newDataList]);
    setNewItemLoading(false);
    setOffset((prevOffset) => prevOffset + 9);
  };

  const renderItems = (items) => {
    const renderedItems = items.map((char, i) => {
      return (
        <li
          className="char__item"
          tabIndex={0}
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          onClick={() => {
            setSelected(char.id);
            focusOnItem(i);
          }}
        >
          <img src={char.thumbnail} alt={char.name} />
          <div className="char__name">{char.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{renderedItems}</ul>;
  };

  const elements = useMemo(
    () => setContent(service.process, () => renderItems(data), newItemLoading),
    [data, newItemLoading]
  );

  return (
    <div className="char__list">
      {elements}
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

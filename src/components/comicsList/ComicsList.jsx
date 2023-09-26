import "./comicsList.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MarvelService from "../../services/MarvelService.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import Spinner from "../spinner/spinner.jsx";

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

const ComicsList = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [newDataLoading, setNewDataLoading] = useState(false);

  const service = MarvelService();

  useEffect(() => {
    onComicsLoading(true);
  }, []);

  const onComicsLoading = (initial) => {
    initial ? setNewDataLoading(false) : setNewDataLoading(true);
    service
      .getComicsList(offset)
      .then(onComicsListLoaded)
      .then(() => service.setProcess("confirmed"));
  };

  const onComicsListLoaded = (newDataList) => {
    let ended = false;
    if (newDataList.length < 8) ended = true;

    setData([...data, ...newDataList]);
    setNewDataLoading(false);
    setOffset((prevOffset) => prevOffset + 9);
  };

  const renderItems = (items) => {
    const renderedItems = items.map((item) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`${item.id}`}>
            <img src={item.img} alt={item.title} className="comics__item-img" />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{renderedItems}</ul>;
  };

  return (
    <div className="comics__list">
      {setContent(service.process, () => renderItems(data), newDataLoading)}
      <button
        className="button button__main button__long"
        disabled={newDataLoading}
        onClick={() => onComicsLoading(false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

import "./comicsList.scss";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MarvelService from "../../services/MarvelService.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import Spinner from "../spinner/spinner.jsx";

const ComicsList = () => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [newDataLoading, setNewDataLoading] = useState(false);

  const service = MarvelService();
  // const comicsItems = useRef([]);

  useEffect(() => {
    onComicsLoading(true);
  }, []);

  // const setFocus = (id) => {
  //   comicsItems.current.forEach((item) => {
  //     item.classList.remove("comics__item_selected");
  //   });
  //   comicsItems.current[id].classList.add("comic s__item_selected");
  //   comicsItems.current[id].focus();
  // };

  const onComicsListLoaded = (comicsList) => {
    const newComicsList = comicsList.map((item) => {
      return (
        <li className="comics__item" key={item.id}>
          <Link to={`${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    setData([...data, newComicsList]);
    setOffset((offset) => offset + 8);
    setNewDataLoading(false);
  };

  const onComicsLoading = (initial) => {
    initial ? setNewDataLoading(false) : setNewDataLoading(true);
    service.getComicsList(offset).then(onComicsListLoaded);
  };

  const toFillContent = (component) => {
    const items = [];
    for (let i = 0; i < 8; i++) {
      items.push(
        <li className="comics__item" key={i}>
          {component}
        </li>
      );
    }
    return items;
  };

  const spinner =
    service.loading && !newDataLoading ? toFillContent(<Spinner />) : null;
  const error = service.error ? toFillContent(<ErrorMessage />) : null;

  return (
    <div className="comics__list">
      <ul className="comics__grid">
        {data}
        {spinner}
        {error}
      </ul>
      <button
        className="button button__main button__long"
        onClick={() => onComicsLoading(false)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;

import "./singleComicPage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import MarvelService from "../../services/MarvelService.jsx";

const SingleComicPage = () => {
  const [comic, setComic] = useState({});
  const comicId = useParams();
  const service = MarvelService();

  const onComicLoaded = (data) => {
    setComic(data);
  };

  const updateData = () => {
    service.clearError();
    service.getComic(comicId).then(onComicLoaded);
  };

  useEffect(updateData, [comicId]);

  const renderComic = () => {
    return (
      <>
        <img src={comic.img} alt={comic.title} className="single-comic__img" />
        <div className="single-comic__info">
          <h2 className="single-comic__name">{comic.title}</h2>
          <p className="single-comic__descr">{comic.description}</p>
          <p className="single-comic__descr">{comic.pageCount}</p>
          <p className="single-comic__descr">{comic.language}</p>
          <div className="single-comic__price">{comic.price}</div>
        </div>
        <Link to={"/comics"} className="single-comic__back">
          Back to all
        </Link>
      </>
    );
  };

  const errorMessage = service.error ? <ErrorMessage /> : null;
  const spinner = service.loading ? <Spinner /> : null;
  const content = !(service.error || service.loading || !comic)
    ? renderComic()
    : null;

  return (
    <div className="single-comic">
      {content}
      {errorMessage}
      {spinner}
    </div>
  );
};

export default SingleComicPage;

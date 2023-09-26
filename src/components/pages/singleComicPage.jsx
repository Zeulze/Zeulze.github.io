import "./singleComicPage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../spinner/spinner.jsx";
import ErrorMessage from "../errorMessage/errorMessage.jsx";
import MarvelService from "../../services/MarvelService.jsx";
import { setContent } from "../../utils/setContent.jsx";

const SingleComicPage = () => {
  const [comic, setComic] = useState({});
  const { comicId } = useParams();
  const service = MarvelService();

  const onComicLoaded = (data) => {
    setComic(data);
  };

  const updateData = () => {
    service.clearError();
    service
      .getComic(comicId)
      .then(onComicLoaded)
      .then(() => service.setProcess("confirmed"));
  };

  useEffect(updateData, [comicId]);

  return (
    <div className="single-comic">
      {setContent(service.process, View, comic)}
    </div>
  );
};

const View = ({ data }) => {
  return (
    <>
      <img src={data.img} alt={data.title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{data.title}</h2>
        <p className="single-comic__descr">{data.description}</p>
        <p className="single-comic__descr">{data.pageCount}</p>
        <p className="single-comic__descr">{data.language}</p>
        <div className="single-comic__price">{data.price}</div>
      </div>
      <Link to={"/comics"} className="single-comic__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComicPage;

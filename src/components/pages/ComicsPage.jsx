import ComicsList from "../comicsList/ComicsList.jsx";
import AppBanner from "../appBanner/AppBanner.jsx";

const ComicsPage = () => {
  return (
    <div className={"comics"}>
      <AppBanner />
      <ComicsList />
    </div>
  );
};

export default ComicsPage;

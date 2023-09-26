import useHttp from "../hooks/http.hook.js";

const useMarvelService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=d6acbece0f2e9a54d9ebe08856f75de1";
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
    );

    return res.data.results.map(_transformCharacter);
  };

  const getComicsList = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`
    );
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);

    const characterInfo = res.data.results[0];

    return _transformCharacter(characterInfo);
  };

  const _transformComics = (comicsInfo) => {
    return {
      id: comicsInfo.id,
      title: comicsInfo.title,
      price: comicsInfo.prices[0].price
        ? `${comicsInfo.prices[0].price}$`
        : "NOT AVAILABLE",
      img: `${comicsInfo.thumbnail.path}.${comicsInfo.thumbnail.extension}`,
      description: comicsInfo.description || "There's no description",
      language: comicsInfo.textObjects.language || "en-us",
      pageCount: comicsInfo.pageCount
        ? `${comicsInfo.pageCount} p.`
        : "No information about the number of pages",
    };
  };

  const _transformCharacter = (characterInfo) => {
    return {
      name: characterInfo.name,
      description:
        characterInfo.description ||
        `There is no data about this character, sorry :(`,
      thumbnail: `${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`,
      homepage: characterInfo.urls[0].url,
      wiki: characterInfo.urls[1].url,
      id: characterInfo.id,
      comics: characterInfo.comics.items,
    };
  };

  return {
    getCharacter,
    getAllCharacters,
    clearError,
    getComicsList,
    getComic,
    process,
    setProcess,
  };
};

export default useMarvelService;

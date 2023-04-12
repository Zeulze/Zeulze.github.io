class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=d6acbece0f2e9a54d9ebe08856f75de1";

  getAllCharacters = async () => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );

    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );

    const characterInfo = res.data.results[0];

    return this._transformCharacter(characterInfo);
  };

  getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
      throw new Error(`Could not fetch ${url}, status ${result.status}`);
    }

    return await result.json();
  };

  _transformCharacter = (characterInfo) => {
    const desc = !!characterInfo.description
      ? `${characterInfo.description}`
      : `There is no data about this character, sorry :(`;

    return {
      name: characterInfo.name,
      description: desc,
      thumbnail: `${characterInfo.thumbnail.path}.${characterInfo.thumbnail.extension}`,
      homepage: characterInfo.urls[0].url,
      wiki: characterInfo.urls[1].url,
    };
  };
}
export default MarvelService;

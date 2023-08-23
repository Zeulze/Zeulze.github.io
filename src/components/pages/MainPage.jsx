import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import decoration from "../../resources/img/vision.png";
import { useState } from "react";

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList setSelected={onCharSelected} />
        <CharInfo selectedChar={selectedChar} />
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;

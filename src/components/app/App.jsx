import AppHeader from "../appHeader/AppHeader.jsx";
import RandomChar from "../randomChar/RandomChar.jsx";
import CharList from "../charList/CharList.jsx";
import CharInfo from "../charInfo/CharInfo.jsx";
import { useState } from "react";

import decoration from "../../resources/img/vision.png";

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (id) => {
    setSelectedChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <RandomChar />
        <div className="char__content">
          <CharList setSelected={setSelectedChar} />
          <CharInfo selectedChar={selectedChar} />
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;

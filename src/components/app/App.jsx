import AppHeader from "../appHeader/AppHeader.jsx";
import { MainPage, ComicsPage, Page404, SingleComicPage } from "../pages";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path={"/"} element={<MainPage />} />
            <Route path={"comics"} element={<Outlet />}>
              <Route index element={<ComicsPage />} />
              <Route id path={":comicId"} element={<SingleComicPage />} />
            </Route>
            <Route path={"*"} element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

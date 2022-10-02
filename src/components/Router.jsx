import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import NovelWrite from "../routes/NovelWrite";

export default function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/write"
              element={<NovelWrite userObj={userObj} />}
            />
          </>
        ) : (
          <>
            <Route exact path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

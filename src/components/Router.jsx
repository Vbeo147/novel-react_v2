import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import NovelWrite from "../routes/NovelWrite";
import NovelModify from "../routes/NovelModify";
import NovelResult from "../routes/NovelResult";

export default function AppRouter({ isLoggedIn, userObj }) {
  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route exact path="/" element={<Home userObj={userObj} />} />
            <Route
              exact
              path="/write"
              element={<NovelWrite userObj={userObj} />}
            />
            <Route exact path="/modify/:id" element={<NovelModify />} />
            <Route exact path="/result/:id" element={<NovelResult />} />
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

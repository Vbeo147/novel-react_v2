import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import NovelWrite from "../routes/NovelWrite";
import NovelModify from "../routes/NovelModify";
import NovelResult from "../routes/NovelResult";

export default function AppRouter({ isLoggedIn, userObj }) {
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route exact path="/" element={<Home userObj={userObj} />} />
          <Route
            exact
            path="/write"
            element={<NovelWrite userObj={userObj} onHome={onHome} />}
          />
          <Route
            exact
            path="/modify/:id"
            element={<NovelModify onHome={onHome} />}
          />
          <Route
            exact
            path="/result/:id"
            element={<NovelResult onHome={onHome} />}
          />
        </>
      ) : (
        <>
          <Route exact path="/" element={<Auth />} />
        </>
      )}
    </Routes>
  );
}

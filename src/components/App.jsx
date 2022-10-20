import { useEffect, useState } from "react";
import { authService } from "../firebase";
import AppRouter from "./Router";
import "../css/reset.css";
import "../css/Components.css";

export default function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  });
  return (
    <div>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

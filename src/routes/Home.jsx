import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, authService } from "../firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Pagination from "../components/Pagination";
import styles from "../css/Home.module.css";

function Home({ userObj }) {
  const [novel, setNovel] = useState([]);
  const [sort, setSort] = useState(true);
  useEffect(() => {
    onSnapshot(
      query(
        collection(dbService, "novel"),
        orderBy("createdAt", sort ? "desc" : "asc")
      ),
      (snapshot) => {
        const novelArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNovel(novelArray);
      }
    );
  }, [sort]);
  const navigate = useNavigate();
  const toggleSortClick = useCallback(() => setSort(!sort), [sort]);
  return (
    <div className={styles.home_main_container}>
      <div className={styles.home_header_container}>
        <h1>Novel</h1>
        <span>used React & Firebase</span>
        <div className={styles.home_header_btn_container}>
          <button
            onClick={() => {
              navigate("/write");
            }}
          >
            Novel Write
          </button>
          <button onClick={toggleSortClick}>{sort ? "Reverse" : "Sort"}</button>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            authService.signOut();
          }}
        >
          Log Out
        </button>
      </div>
      <Pagination items={novel} userObj={userObj} itemsPerPage={5} />
    </div>
  );
}

export default Home;

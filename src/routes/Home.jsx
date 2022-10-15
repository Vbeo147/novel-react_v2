import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";
import { dbService } from "../firebase";

export default function Home({ userObj }) {
  const [novel, setNovel] = useState([]);
  const [sort, setSort] = useState(true);
  useEffect(() => {
    dbService.collection("novel").onSnapshot((snapshot) => {
      const novelArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNovel(novelArray);
    });
  }, []);
  const navigate = useNavigate();
  const toggleSortClick = () => setSort((prev) => !prev);
  return (
    <div>
      <h1>Novel</h1>
      <div>
        <button
          onClick={() => {
            navigate("/write");
          }}
        >
          Novel Write
        </button>
        <button onClick={toggleSortClick}>{sort ? "Reverse" : "Sort"}</button>
      </div>
      <Pagination
        items={novel}
        userObj={userObj}
        itemsPerPage={5}
        sort={sort}
      />
    </div>
  );
}

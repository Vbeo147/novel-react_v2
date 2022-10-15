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
  const NovelSort = () => {
    novel.sort((prevIndex, nextIndex) => {
      if (prevIndex.createdAt > nextIndex.createdAt) {
        return Boolean(sort) ? 1 : -1;
      } else if (prevIndex.createdAt < nextIndex.createdAt) {
        return Boolean(sort) ? -1 : 1;
      } else {
        return 0;
      }
    });
  };

  NovelSort();

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
      <Pagination items={novel} userObj={userObj} itemsPerPage={1} />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NovelMap from "../components/NovelMap";
import Pagenation from "../components/Pagenation";
import { dbService } from "../firebase";

export default function Home({ userObj }) {
  const [novel, setNovel] = useState([]);
  const [sort, setSort] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 2;
  const offset = (page - 1) * limit;
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
        <button onClick={toggleSortClick}>{sort ? "Sort" : "Reverse"}</button>
      </div>
      <div>
        {novel.slice(offset, offset + limit).map((novels) => (
          <div key={novels.id}>
            <NovelMap userObj={userObj} novelObj={novels} />
          </div>
        ))}
      </div>
      {novel.length !== 0 ? (
        <Pagenation total={novel.length} limit={limit} setPage={setPage} />
      ) : null}
    </div>
  );
}

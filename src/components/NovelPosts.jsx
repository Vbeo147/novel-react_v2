import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase";
import Pagenation from "./Pagenation";

export default function NovelMap({ sort, userObj }) {
  const [novel, setNovel] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
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
  useEffect(() => {
    dbService.collection("novel").onSnapshot((snapshot) => {
      const novelArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNovel(novelArray);
    });
  }, []);

  NovelSort();

  const onDelete = async (id) => {
    await dbService.doc(`novel/${id}`).delete();
  };
  return (
    <div>
      {novel.slice(offset, offset + limit).map((novels) => (
        <div key={novels.id}>
          {novels.novel.title}
          {novels.creatorId === userObj.uid ? (
            <>
              <button onClick={() => onDelete(novels.id)}>Delete</button>
              <button onClick={() => navigate(`/modify/${novels.id}`)}>
                Modify
              </button>
            </>
          ) : null}
        </div>
      ))}
      <div>
        <Pagenation
          total={novel.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

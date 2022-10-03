import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase";

export default function NovelMap({ sort, userObj }) {
  const [novel, setNovel] = useState([]);
  const navigate = useNavigate();
  const NovelSort = () => {
    novel.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return Boolean(sort) ? 1 : -1;
      } else if (a.createdAt < b.createdAt) {
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
      {novel.map((novels) => (
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
    </div>
  );
}

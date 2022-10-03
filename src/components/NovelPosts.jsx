import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import Pagenation from "./Pagenation";

export default function NovelMap({ userObj, novelObj, novelArr }) {
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const onDelete = async (id) => {
    await dbService.doc(`novel/${id}`).delete();
    await storageService.refFromURL(novelObj.attachmentUrl).delete();
  };
  return (
    <div>
      {novelArr.slice(offset, offset + limit).map((novels) => (
        <div key={novels.id}>
          {novels.attachmentUrl && (
            <img src={novels.attachmentUrl} width="50px" height="50px" alt="" />
          )}
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
      {novelArr.length !== 0 ? (
        <Pagenation
          total={novelArr.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      ) : null}
    </div>
  );
}

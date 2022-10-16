import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";

function NovelMap({ userObj, novelObj }) {
  const navigate = useNavigate();
  const onDelete = useCallback(
    async (id) => {
      await dbService.doc(`novel/${id}`).delete();
      await storageService.refFromURL(novelObj.attachmentUrl).delete();
    },
    [novelObj]
  );
  return (
    <>
      {novelObj &&
        novelObj.map((novel) => (
          <div key={novel.id}>
            {novel.attachmentUrl && (
              <img
                src={novel.attachmentUrl}
                width="50px"
                height="50px"
                alt=""
              />
            )}
            <span
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                navigate(`/result/${novel.id}`);
              }}
            >
              {novel.novel.title}
            </span>
            {novel.creatorId === userObj.uid ? (
              <>
                <button onClick={() => onDelete(novel.id)}>Delete</button>
                <button onClick={() => navigate(`/modify/${novel.id}`)}>
                  Modify
                </button>
              </>
            ) : null}
          </div>
        ))}
    </>
  );
}

export default NovelMap;

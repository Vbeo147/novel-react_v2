import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";

export default function NovelMap({ userObj, novelObj }) {
  const navigate = useNavigate();
  const onDelete = async (id) => {
    await dbService.doc(`novel/${id}`).delete();
    await storageService.refFromURL(novelObj.attachmentUrl).delete();
  };
  return (
    <div>
      <div key={novelObj.id}>
        {novelObj.attachmentUrl && (
          <img src={novelObj.attachmentUrl} width="50px" height="50px" alt="" />
        )}
        <span
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate(`/result/${novelObj.id}`);
          }}
        >
          {novelObj.novel.title}
        </span>
        {novelObj.creatorId === userObj.uid ? (
          <>
            <button onClick={() => onDelete(novelObj.id)}>Delete</button>
            <button onClick={() => navigate(`/modify/${novelObj.id}`)}>
              Modify
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

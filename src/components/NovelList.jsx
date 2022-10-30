import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { dbService, storageService } from "../firebase";
import styles from "../css/List.module.css";

function NovelList({ userObj, novelObj }) {
  const navigate = useNavigate();
  const onDelete = useCallback(async (id, attachment) => {
    await dbService.doc(`novel/${id}`).delete();
    await storageService.refFromURL(attachment).delete();
  }, []);
  return (
    <div>
      {novelObj &&
        novelObj.map((novel) => (
          <div className={styles.list_container} key={novel.id}>
            <div
              onClick={() => {
                navigate(`/result/${novel.id}`);
              }}
              className={styles.list_title_container}
            >
              {novel.attachmentUrl && <img src={novel.attachmentUrl} alt="" />}
              <span>{novel.novel.title}</span>
            </div>
            <div className={styles.list_btn_container}>
              {novel.creatorId === userObj.uid ? (
                <div>
                  <button
                    onClick={() => {
                      const answer =
                        window.confirm("해당 글 삭제를 원하시나요?");
                      if (answer) onDelete(novel.id, novel.attachmentUrl);
                    }}
                  >
                    Delete
                  </button>
                  <button onClick={() => navigate(`/modify/${novel.id}`)}>
                    Modify
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
}

export default NovelList;

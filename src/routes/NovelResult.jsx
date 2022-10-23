import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../firebase";
import styles from "../css/Result.module.css";

export default function NovelResult({ onHome }) {
  const { id } = useParams();
  const [data, setData] = useState({ title: "", text: "", img: "" });
  useEffect(() => {
    dbService.doc(`novel/${id}`).onSnapshot((snapshot) => {
      const data = snapshot.data();
      setData({
        title: data.novel.title,
        text: data.novel.text,
        img: data.attachmentUrl,
      });
    });
  }, [id]);
  return (
    <div className={styles.result_container}>
      {data.img && (
        <div className={styles.result_img_container}>
          <img src={data.img} alt="" />
        </div>
      )}
      <div className={styles.result_title_container}>
        <span>{data.title}</span>
      </div>
      <div className={styles.result_text_container}>
        <p>{data.text}</p>
      </div>
      <div className={styles.result_btn_container}>
        <button
          type="button"
          onClick={() => {
            onHome();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

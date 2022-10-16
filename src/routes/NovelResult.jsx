import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "../firebase";

export default function NovelResult({ onHome }) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    dbService.doc(`novel/${id}`).onSnapshot((snapshot) => {
      const data = snapshot.data();
      setData([data.novel.title, data.novel.text]);
    });
  }, [id]);
  return (
    <div>
      <div>
        <h1>{data[0]}</h1>
      </div>
      <div>
        <p>{data[1]}</p>
      </div>
      <div>
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

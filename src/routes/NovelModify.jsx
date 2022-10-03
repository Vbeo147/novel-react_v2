import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { dbService } from "../firebase";

export default function NovelModify() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [Value, setValue] = useState();
  const titleRef = useRef();
  const textRef = useRef();
  useEffect(() => {
    dbService.doc(`novel/${id}`).onSnapshot((snapshot) => {
      const data = snapshot.data();
      setValue({
        title: data.novel.title,
        text: data.novel.text,
      });
    });
  }, [id]);
  const onChange = () => {
    setValue({
      title: titleRef.current.value,
      text: textRef.current.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`novel/${id}`).update({
      novel: {
        title: Value.title,
        text: Value.text,
      },
    });
    navigate("/");
  };
  return (
    <div>
      {Value ? (
        <form onSubmit={onSubmit}>
          <div>
            <input
              onChange={onChange}
              type="text"
              placeholder="제목"
              value={Value.title || ""}
              ref={titleRef}
              required
            />
          </div>
          <div>
            <textarea
              onChange={onChange}
              value={Value.text || ""}
              ref={textRef}
              required
            ></textarea>
          </div>
          <div>
            <button type="submit">Modify</button>
            <button type="button" onClick={() => navigate("/")}>
              Close
            </button>
          </div>
        </form>
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

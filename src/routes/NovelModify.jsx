import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { dbService } from "../firebase";
import ModifyForm from "../components/ModifyForm";

export default function NovelModify({ onHome }) {
  const { id } = useParams();
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
    onHome();
  };
  return (
    <div>
      {Value ? (
        <ModifyForm
          onSubmit={onSubmit}
          onChange={onChange}
          Value={Value}
          titleRef={titleRef}
          textRef={textRef}
          onHome={onHome}
        />
      ) : (
        "Initializing..."
      )}
    </div>
  );
}

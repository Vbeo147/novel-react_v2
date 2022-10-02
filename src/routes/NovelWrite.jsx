import { useState, useRef } from "react";
import { dbService } from "../firebase";

export default function NovelWrite({ userObj }) {
  const [Value, setValue] = useState({ title: "", text: "" });
  const { title, text } = Value;
  const titleRef = useRef();
  const textRef = useRef();
  const onChange = () => {
    setValue({ title: titleRef.current.value, text: textRef.current.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const novelObj = {
      novel: {
        title,
        text,
      },
      creatorId: userObj.uid,
      createdAt: Date.now(),
    };
    await dbService.collection("novel").add(novelObj);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            onChange={onChange}
            value={title || ""}
            type="text"
            placeholder="제목"
            ref={titleRef}
            required
          />
        </div>
        <div>
          <textarea
            onChange={onChange}
            value={text || ""}
            ref={textRef}
            required
          ></textarea>
        </div>
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

import { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebase";
import WriteForm from "../components/WriteForm";

export default function NovelWrite({ userObj, onHome }) {
  const [attachment, SetAttachment] = useState("");
  const [value, setValue] = useState({ title: "", text: "" });
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const textRef = useRef();
  const onFileChange = useCallback((e) => {
    const {
      target: { files },
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      SetAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }, []);
  const onChange = useCallback(() => {
    setValue({
      title: titleRef.current.value,
      text: textRef.current.value,
    });
  }, []);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { title, text } = value;
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const novelObj = {
      novel: {
        title,
        text,
      },
      creatorId: userObj.uid,
      createdAt: Date.now(),
      attachmentUrl,
    };
    await dbService.collection("novel").add(novelObj);
    SetAttachment("");
    setLoading(false);
    onHome();
  };
  const onClearAttachment = useCallback(() => SetAttachment(null), []);
  return (
    <div>
      <WriteForm
        loading={loading}
        onFileChange={onFileChange}
        onChange={onChange}
        onSubmit={onSubmit}
        onClearAttachment={onClearAttachment}
        attachment={attachment}
        titleRef={titleRef}
        textRef={textRef}
        onHome={onHome}
      />
    </div>
  );
}

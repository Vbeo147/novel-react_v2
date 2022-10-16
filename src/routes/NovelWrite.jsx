import { useState, useRef, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebase";

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
  const onClearAttachment = useCallback(() => SetAttachment(null), []);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const { title, text } = value;
          let attachmentUrl = "";
          if (attachment !== "") {
            const attachmentRef = storageService
              .ref()
              .child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(
              attachment,
              "data_url"
            );
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
        }}
      >
        <div>
          <input
            onChange={onChange}
            type="text"
            placeholder="제목"
            required
            autoComplete="off"
            ref={titleRef}
          />
        </div>
        <div>
          <input
            onChange={onChange}
            type="text"
            placeholder="내용"
            required
            autoComplete="off"
            ref={textRef}
          />
        </div>
        <div>
          <label htmlFor="ex_file">Picture</label>
          <input
            id="ex_file"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
        {attachment && (
          <div className="components_column">
            <img
              src={attachment}
              width="50px"
              height="50px"
              style={{
                marginBottom: "12px",
              }}
              alt=""
            />
            <button
              className="components_form_input_submit"
              onClick={onClearAttachment}
            >
              Clear
            </button>
          </div>
        )}
        <div>
          <button type="submit" disabled={loading}>
            Enter
          </button>
          <button type="button" onClick={onHome}>
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

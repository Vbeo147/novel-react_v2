import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "../firebase";

export default function NovelWrite({ userObj }) {
  const [attachment, SetAttachment] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const onFileChange = (e) => {
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
  };
  const onClearAttachment = () => SetAttachment(null);
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { title, text } = formData;
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
          onHome();
        })}
      >
        <div>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="제목"
            {...register("title")}
            required
            autoComplete="off"
          />
        </div>
        <div>
          <input
            id="text"
            type="text"
            name="text"
            placeholder="내용"
            {...register("text")}
            required
            autoComplete="off"
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
          <button type="submit" disabled={isSubmitting}>
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

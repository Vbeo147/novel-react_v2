import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { dbService } from "../firebase";

export default function NovelWrite({ userObj }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const onHome = () => navigate("/");
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { title, text } = formData;
          const novelObj = {
            novel: {
              title,
              text,
            },
            creatorId: userObj.uid,
            createdAt: Date.now(),
          };
          await dbService.collection("novel").add(novelObj);
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
          />
        </div>
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

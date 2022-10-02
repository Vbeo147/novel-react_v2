import { useForm } from "react-hook-form";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data.email))}>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="test@email.com"
            {...register("email", {
              required: "이메일은 필수 입력란입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
            required
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            {...register("password", {
              required: "비밀번호는 필수 입력란입니다.",
              minLength: {
                value: 8,
                message: "비밀번호 8자리 이상 입력해주세요.",
              },
            })}
            required
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          로그인
        </button>
      </form>
    </div>
  );
}

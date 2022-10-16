import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../firebase";

export default function AuthForm() {
  const [newAccount, setNewAccount] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  const toggleAccount = useCallback(() => {
    setNewAccount(!newAccount);
  }, [newAccount]);
  return (
    <div>
      <form
        onSubmit={handleSubmit(async (formData) => {
          const { email, password } = formData;
          try {
            let data;
            if (newAccount) {
              // create account
              data = await authService.createUserWithEmailAndPassword(
                email,
                password
              );
            } else {
              // sign in
              data = await authService.signInWithEmailAndPassword(
                email,
                password
              );
            }
            console.log(data);
          } catch (error) {
            alert(error);
          }
        })}
      >
        <div>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="test@email.com"
            autoComplete="off"
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
        <div>
          <button type="submit" disabled={isSubmitting}>
            {newAccount ? "회원가입" : "로그인"}
          </button>
          <span
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={toggleAccount}
          >
            {newAccount ? "로그인" : "회원가입"}
          </span>
        </div>
      </form>
    </div>
  );
}

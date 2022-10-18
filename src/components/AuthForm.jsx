import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { authService } from "../firebase";

export default function AuthForm({ styles }) {
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
      <div className={styles.auth_form_title}>
        {newAccount ? "Sign up" : "Sign in"}
      </div>
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
        <div className={styles.auth_form_input_container}>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
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
        </div>
        <div className={styles.auth_form_error}>
          {errors.email && (
            <span className={styles.auth_form_error}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={styles.auth_form_input_container}>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: "비밀번호는 필수 입력란입니다.",
              minLength: {
                value: 8,
                message: "비밀번호 8자리 이상 입력해주세요.",
              },
            })}
            required
          />
        </div>
        <div className={styles.auth_form_error}>
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className={styles.auth_btn_container}>
          <div className={styles.auth_btn_submit}>
            <button type="submit" disabled={isSubmitting}>
              {newAccount ? "회원가입" : "로그인"}
            </button>
          </div>
          <div className={styles.auth_btn_social}>
            <span onClick={toggleAccount}>
              {newAccount ? "로그인" : "회원가입"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

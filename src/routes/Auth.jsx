import { authService, firebaseInstance } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import AuthForm from "../components/AuthForm";
import styles from "../css/Auth.module.css";

export default function Auth() {
  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <div className={styles.auth_container}>
      <AuthForm styles={styles} />
      <div>
        <button
          className={styles.auth_google_btn}
          onClick={onSocialClick}
          name="google"
        >
          <span>
            <FontAwesomeIcon icon={faGoogle} />
          </span>
          &nbsp; Continue with Google
        </button>
      </div>
    </div>
  );
}

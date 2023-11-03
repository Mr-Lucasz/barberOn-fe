import styles from "./LoginPage.module.css";
import { Header } from "../../components/Header.jsx";
import { FormLogin } from "../../components/Form/FormLogin.jsx";

export function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <Header showButton={false} showNavbar={false} />
      <FormLogin showForgotPassword={true} />
    </div>
  );
}

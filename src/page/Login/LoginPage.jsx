import styles from "./LoginPage.module.css";
import { Header } from "../../components/Header.jsx";
import { Form } from "../../components/Form.jsx";

export function LoginPage() {
  return (
    <div className={styles.loginWrapper}>
      <Header showButton={false} showNavbar={false}  showIconEnter={false}/>
      <Form />
    </div>
  );
}

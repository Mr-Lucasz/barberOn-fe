import styles from "./RegisterPage.module.css";
import { Header } from "../../components/Header.jsx";
import { Form } from "../../components/Form.jsx";

export function RegisterPage() {
  return (
    <div className={styles.registerWrapper}>
      <Header showButton={false} showNavbar={false} />
      <Form formType="" showForgotPassword={false} />
    </div>
  );
}

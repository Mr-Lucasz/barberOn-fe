import styles from "./RegisterPage.module.css";
import { Header } from "../../components/Header.jsx";
import { FormRegister} from "../../components/Form/FormRegister.jsx";

export function RegisterPage() {
  return (
    <div className={styles.registerWrapper}>
      <Header showButton={false} showNavbar={false} />
      <FormRegister showForgotPassword={false} />
    </div>
  );
}

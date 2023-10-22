import styles from "./LoginPage.module.css";
import { Header } from "../../components/Header.jsx";


export function LoginPage() {
  return (
    <>
    <Header showButton={false} showNavbar={false} centeredLogo={true} />
    <div className={styles.loginWrapper}>
    </div>
    </>
  );
}

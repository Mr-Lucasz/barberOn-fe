import styles from "./Footer.module.css";
import LogoOn from "../assets/switch-on-footer.svg";
import Linkedin from "../assets/Linkedin.svg";
import WhatsApp from "../assets/Whatsapp.svg";
import Instagram from "../assets/Instagram.svg";
import Facebook from "../assets/Facebook.svg";
import Copyright from "../assets/Copyright.svg";

export function Footer() {
  return (
    <footer className={styles.footer}>
        <div className={styles["footer-content-logo"]}>
          <span className={styles["footer-logo-text"]}>Barber</span>
          <img src={LogoOn} alt="Logo" />
        </div>
        <div className={styles["logo-contacts"]}>
          <img src={Linkedin} alt="Logo" />
          <img src={WhatsApp} alt="Logo" />
          <img src={Instagram} alt="Logo" />
          <img src={Facebook} alt="Logo" />
        </div>
        <div className={styles["footer-content-text"]}>
          <img src={Copyright} alt="Logo" />
          <span> 2023 Barber On. Todos os direitos reservados.</span>
        </div>
    </footer>
  );
}

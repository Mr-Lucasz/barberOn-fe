import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar} from "./util/Navbar.jsx";


export function Header() {
  return (
    <header className={styles.header}>
      <img
        className="logotipo-barbearia"
        src={barberOnLogo}
        alt="logotipo da barbearia"
      />
      <Navbar />
      <Button color="white" size="large" buttonName="ENTRAR">
        ENTRAR
      </Button>
    </header>
  );
}

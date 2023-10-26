import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar } from "./util/Navbar.jsx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function Header({
  showButton = true,
  showNavbar = true,
  centeredLogo = false,
}) {
  const isCentered = !showButton && !showNavbar;
  const headerClassNames = isCentered
    ? `${styles.header}`
    : `${styles.header} ${centeredLogo ? styles.centeredLogo : ""}`;

  const links = [
    { href: "#home", text: "Home" },
    { href: "#services", text: "Serviços" },
    { href: "#contacts", text: "Contatos" },
  ];

  return (
    <header className={headerClassNames}>
      <Link to="/">
        <img
          className="logotipo-barbearia"
          src={barberOnLogo}
          alt="logotipo da barbearia"
        />
      </Link>
      {showNavbar && <Navbar links={links} />}
      {showButton && (
        <Link to="/login">
          <Button color="white" size="large" buttonName="ENTRAR">
            ENTRAR
          </Button>
        </Link>
      )}
    </header>
  );
}

Header.propTypes = {
  showButton: PropTypes.bool,
  showNavbar: PropTypes.bool,
  centeredLogo: PropTypes.bool,
};

Header.defaultProps = {
  showButton: true,
  showNavbar: true,
  centeredLogo: false,
};

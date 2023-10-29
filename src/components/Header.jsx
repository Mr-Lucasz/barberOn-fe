import PropTypes from "prop-types";
import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar } from "./util/Navbar.jsx";
import { Link } from "react-router-dom";
import enterIcon from "../assets/Enter.svg";

export function Header({
  showButton = true,
  showNavbar = true,
  showIconEnter = true,
}) {
  const links = [
    { href: "#home", text: "Home" },
    { href: "#services", text: "Serviços" },
    { href: "#contacts", text: "Contatos" },
  ];
  const isLoginPage = location.pathname === "/login";

  return (
    <header
      className={`${styles.header} ${isLoginPage ? styles.loginHeader : ""}`}
    >
      <Link to="/">
        <img
          className={styles.logo}
          src={barberOnLogo}
          alt="logotipo da barbearia"
        />
      </Link>
      {showNavbar && <Navbar links={links} />}
      <div className={styles.button}>
        {showButton && (
          <Link to="/login">
            <Button color="white" size="large" buttonName="ENTRAR">
              ENTRAR
            </Button>
          </Link>
        )}
      </div>
      {showIconEnter && (
        <Link to="/login">
          <div className={styles.btnEntrar}>
            <img
              className={styles.iconEnter}
              src={enterIcon}
              alt="icone de entrar"
            />
          </div>
        </Link>
      )}
    </header>
  );
}

Header.propTypes = {
  showButton: PropTypes.bool,
  showNavbar: PropTypes.bool,
  showIconEnter: PropTypes.bool,
};

Header.defaultProps = {
  showButton: true,
  showNavbar: true,
  showIconEnter: true,
};

import PropTypes from "prop-types";
import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar } from "./util/Navbar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Header({
  showButton = true,
  showNavbar = true,

}) {
  const links = [
    { href: "#home", text: "Home" },
    { href: "#services", text: "Serviços" },
    { href: "#contacts", text: "Contatos" },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header
      className={`${styles.header} ${isLoginPage ? styles.loginHeader : ""} ${isRegisterPage ? styles.loginHeader : ""}`}
    >
      <Link to="/">
        <img
          className={styles.logo}
          src={barberOnLogo}
          alt="logotipo da barbearia"
        />
      </Link>
      {showNavbar && <Navbar links={links}isResponsiveMode={isMobile} />}
      <div className={styles.button}>
        {showButton && (
          <Link to="/login">
            <Button color="white" size="large" buttonName="ENTRAR">
              ENTRAR
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  showButton: PropTypes.bool,
  showNavbar: PropTypes.bool,
};

Header.defaultProps = {
  showButton: true,
  showNavbar: true,
};

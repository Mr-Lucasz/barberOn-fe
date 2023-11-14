import PropTypes from "prop-types";
import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar } from "./util/Navbar.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notification from "../assets/Notification.svg";
import HoverIcon from "../assets/HoverNotification.svg";
import AvatarHome from "../assets/AvatarHome.svg";
import AvatarHover from "../assets/AvatarHover.svg";

export function Header({
  showButton = true,
  showNavbar = true,
  isHomePageBarber = false,
  links,
}) {
  const link = [
    { href: "#home", text: "Home" },
    { href: "#services", text: "Serviços" },
    { href: "#contacts", text: "Contatos" },
  ];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { id, step } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  function oneNewNotification() {
    setNotificationCount(notificationCount + 1);
  }
  const handleAvatarClick = () => {
    event.preventDefault();
    setIsDropdownVisible(!isDropdownVisible);
  };
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
  const isRegisterStepPage = id && step;

  return (
    <header
      className={`${styles.header} ${isLoginPage ? styles.loginHeader : ""} 
      ${isRegisterPage ? styles.loginHeader : ""}${
        isRegisterStepPage ? styles.loginHeader : ""
      }`}
    >
      <Link to="/">
        <img
          className={styles.logo}
          src={barberOnLogo}
          alt="logotipo da barbearia"
        />
      </Link>
      {showNavbar && (
        <Navbar links={links || link} isResponsiveMode={isMobile} />
      )}
      <div className={styles.button}>
        {showButton && (
          <Link to="/login">
            <Button color="white" size="large" buttonName="ENTRAR">
              ENTRAR
            </Button>
          </Link>
        )}
        {isHomePageBarber && (
          <div className={styles.icons}>
            <div className={styles.notificationCount}>
              <img
                src={isHovered ? HoverIcon : Notification}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              {notificationCount > 0 && <span>{notificationCount}</span>}
            </div>
            <img
              src={isHoveredAvatar ? AvatarHover : AvatarHome}
              onMouseEnter={() => setIsHoveredAvatar(true)}
              onMouseLeave={() => setIsHoveredAvatar(false)}
              onClick={handleAvatarClick} // Adicione o manipulador de clique aqui
            />
          </div>
        )}
        {isDropdownVisible && (
          <div className={styles.dropdown}>
            <a href="/profile">Ver Perfil</a>
            <a href="/logout">Sair</a>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  showButton: PropTypes.bool,
  showNavbar: PropTypes.bool,
  isHomePageBarber: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

Header.defaultProps = {
  showButton: true,
  showNavbar: true,
  isHomePageBarber: false,
  links: null,
};

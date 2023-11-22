import { useState } from "react";
import menuSandwich from "../../assets/Menu.svg";
import closeMenuSandwich from "../../assets/Close.svg";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

export function Navbar({ links, isResponsiveMode }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  // Adicione a nova opção ao menu apenas no modo responsivo
  const updatedLinks = isResponsiveMode ? [...links, { href: "/login", text: "Entrar" }] : links;

  return (
    <nav className={styles.navbar}>
      <div className={styles.mobile} onClick={handleClick}>
        <i className={click ? styles.closeMenuIcon : styles.menuIcon}>
          {click ? (
            <img src={closeMenuSandwich} alt="Close Menu" className={styles.closeMenuSandwich} />
          ) : (
            <img src={menuSandwich} alt="Menu Sandwich" className={styles.menuSandwich} />
          )}
        </i>
      </div>
      <ul className={`${styles.navbarList} ${click ? styles.showMenu : ""}`}>
        {updatedLinks.map((link, index) => (
          <li key={index} className={styles.navbarItem}>
            <a href={link.href}>{link.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  isResponsiveMode: PropTypes.bool.isRequired, // Certifique-se de definir isResponsiveMode como obrigatório.
};

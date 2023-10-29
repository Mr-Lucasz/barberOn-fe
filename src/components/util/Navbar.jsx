import { useState } from "react"; // Importe React e useState
import menuSandwich from "../../assets/Menu.svg";
import closeMenuSandwich from "../../assets/Close.svg";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

export function Navbar({ links }) {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.mobile} onClick={handleClick}>
        <i className={click ? styles.closeMenuIcon : styles.menuIcon}>
          {click ? (
            <img src={closeMenuSandwich} alt="Close Menu" className={styles.closeMenuSandwich}/>
          ) : (
            <img src={menuSandwich} alt="Menu Sandwich" className={styles.menuSandwich}/>
          )}
        </i>
      </div>
      <ul className={`${styles.navbarList} ${click ? styles.showMenu : ""}`}>
        {links.map((link, index) => (
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
};

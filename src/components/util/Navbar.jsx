import styles from "./Navbar.module.css";

import PropTypes from "prop-types";

export function Navbar({ links }) {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbarList}>
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

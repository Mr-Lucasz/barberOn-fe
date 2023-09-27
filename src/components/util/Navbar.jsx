import styles from './Navbar.module.css';

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarList}>
                <li className={styles.navbarItem}>
                    <a href="#home">Home</a>
                </li>
                <li className={styles.navbarItem}>
                    <a href="#about">Contatos</a>
                </li>
                <li className={styles.navbarItem}>
                    <a href="#services">Serviços</a>
                </li>
            </ul>
        </nav>
    );
}
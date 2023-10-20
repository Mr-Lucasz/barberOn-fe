import styles from './Header.module.css';
import barberOnLogo from '../assets/Logotipo.svg';
import { Button } from './util/Button.jsx';
import { Navbar } from './util/Navbar.jsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Header({ showButton = true, showNavbar = true, centeredLogo = false }) {
  const isCentered = !showButton && !showNavbar;
  const headerClassNames = isCentered ? `${styles.header} ${styles.centered}` : styles.header;

  // Adicione uma classe condicional para centralizar o logotipo
  const logoClassNames = centeredLogo ? styles.centeredLogo : '';

  const links = [
    { href: '#home', text: 'Home' },
    { href: '#services', text: 'Serviços' },
    { href: '#contacts', text: 'Contatos' },
  ];

  return (
    <header className={headerClassNames}>
      {/* Adicione a classe condicional ao logotipo */}
      <img
        className={`logotipo-barbearia ${logoClassNames}`}
        src={barberOnLogo}
        alt="logotipo da barbearia"
      />
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
  centeredLogo: PropTypes.bool, // Adicione a propriedade centeredLogo
};

Header.defaultProps = {
  showButton: true,
  showNavbar: true,
  centeredLogo: false, // Defina o valor padrão para centeredLogo
};

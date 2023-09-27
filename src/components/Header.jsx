import  { useEffect, useState } from "react";
import styles from "./Header.module.css";
import barberOnLogo from "../assets/Logotipo.svg";
import { Button } from "./util/Button.jsx";
import { Navbar } from "./util/Navbar.jsx";

export function Header() {
  const links = [
    { href: '#home', text: 'Home' },
    { href: '#services', text: 'Serviços' },
    { href: '#contacts', text: 'Contatos' },
  ];

  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    const header = document.querySelector(`.${styles.header}`);

    if (header) {
      header.addEventListener("mouseover", () => {
        setIsMouseOver(true);
      });

      header.addEventListener("mouseout", () => {
        setIsMouseOver(false);
      });
    }
  }, []);

  return (
    <header className={`${styles.header} ${isMouseOver ? styles.visible : ""}`}>
      <img
        className="logotipo-barbearia"
        src={barberOnLogo}
        alt="logotipo da barbearia"
      />
      <Navbar links={links} />
      <Button color="white" size="large" buttonName="ENTRAR">
        ENTRAR
      </Button>
    </header>
  );
}

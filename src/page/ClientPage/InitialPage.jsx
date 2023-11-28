import styles from './InitialPage.module.css'
import { Header } from '../../components/Header.jsx'
import { Button } from '../../components/util/Button.jsx'
import { useNavigate } from 'react-router-dom'



export function InitialPage (){

    const navigate = useNavigate();

    const homePageBarberLinks = [
        { href: "/inicial-page", text: "Home" },
        { href: "/homeclient/agendar", text: "Agendar" },
        { href: "/home/service", text: "Histórico" },
      ];

    const handleClickAvancar = () => {
        event.preventDefault();
        navigate("/homeclient/agendar");
      };

    return (
   <div className={styles.wrapperInitialPage}>
           <Header
        showButton={false}
        isHomePageClient={true}
        links={homePageBarberLinks}
      />
       <Button color="save" buttonName="AGENDE SEU HORÁRIO"  onClick={handleClickAvancar}/>
    </div>


    )
}
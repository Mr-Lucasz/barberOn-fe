// import styles from "./PerfilClientPage.module.css";
import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import { FormRegister } from "../../../components/Form/FormRegister.jsx";
import { user } from '../../../mock/employeeMockData';


export function PerfilClientPage() {


    const homePageClientLinks = [
      { href: "/homeclient", text: "Home" },
      { href: "/homeclient/agendar", text: "Agendar" },
      { href: "/homeclient/historico", text: "Histórico" },
    ];
  
    return (
      <WrapperDefault>
        <Header
          showButton={false}
          isHomePageClient={true}
          links={homePageClientLinks}
        />
          <FormRegister barber={user} />
      </WrapperDefault>
    );
  }
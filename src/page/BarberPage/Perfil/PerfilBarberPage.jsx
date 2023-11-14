// import styles from "./PerfilBarberPage.module.css";
import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import { FormRegister } from "../../../components/Form/FormRegister.jsx";
import { user } from '../../../mock/employeeMockData';


export function PerfilBarberPage() {


  const homePageBarberLinks = [
    { href: "/home", text: "Home" },
    { href: "/home/agenda", text: "Agenda" },
    { href: "/home/service", text: "Serviços" },
  ];

  return (
    <WrapperDefault>
      <Header
        showButton={false}
        isHomePageBarber={true}
        links={homePageBarberLinks}
      />
        <FormRegister barber={user} />
    </WrapperDefault>
  );
}

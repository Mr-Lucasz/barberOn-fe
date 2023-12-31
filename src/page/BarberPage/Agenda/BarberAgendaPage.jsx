// import styles from "./BarberAgendaPage.module.css";
import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import { FormAgenda } from "../../../components/Form/FormAgenda.jsx";
import { user } from '../../../mock/employeeMockData';

export function BarberAgendaPage() {
  const homePageBarberLinks = [
    { href: "/inicial-page", text: "Home" },
    { href: "/homeclient/agendar", text: "Agenda" },
    { href: "/home/service", text: "Serviços" },
  ];


  return (
   <WrapperDefault>
      <Header
        showButton={false}
        isHomePageBarber={true}
        links={homePageBarberLinks}
      />
          <FormAgenda barber={user} isEditMode={true}/>
 </WrapperDefault>
  );
}

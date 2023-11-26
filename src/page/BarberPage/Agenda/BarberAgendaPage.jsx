// import styles from "./BarberAgendaPage.module.css";
import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import { FormAgenda } from "../../../components/Form/FormAgenda.jsx";
import { user } from '../../../mock/employeeMockData';
import { useState } from 'react';

export function BarberAgendaPage() {
  const homePageBarberLinks = [
    { href: "/home", text: "Home" },
    { href: "/home/agenda", text: "Agenda" },
    { href: "/home/service", text: "Serviços" },
  ];

  const [editing, setEditing] = useState(true);

  return (
   <WrapperDefault>
      <Header
        showButton={false}
        isHomePageBarber={true}
        links={homePageBarberLinks}
      />
          <FormAgenda barber={user} isEditMode={editing} />
 </WrapperDefault>
  );
}

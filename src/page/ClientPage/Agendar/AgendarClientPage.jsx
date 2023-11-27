import { WrapperDefault } from "../../../components/util/WrapperDefault";
import { Header } from "../../../components/Header";
import { Frame } from "../../../components/Client/Frame";
import { BarberOption } from "../../../components/Client/BarberOption";
import { ServicoOption } from "../../../components/Client/ServicoOption";
import styles from "./AgendarClientPage.module.css";
import { useState } from "react";
import { Agendamento } from "../../../components/Client/Agendamento";

export function AgendarClientPage() {
  const [tabNumber, setTabNumber] = useState(0);

  const homePageBarberLinks = [
    { href: "/inicial-page", text: "Home" },
    { href: "/homeclient/agendar", text: "Agendar" },
    { href: "/home/service", text: "Histórico" },
  ];

  return (
    <WrapperDefault>
      <Header
        showButton={false}
        isHomePageClient={true}
        links={homePageBarberLinks}
      />
      <Frame tabNumber={tabNumber} setTabNumber={setTabNumber}>
        {tabNumber === 0 && <BarberOption setTabNumber={setTabNumber} />}
        {tabNumber === 1 && (
          <ServicoOption onReserveButtonClick={() => setTabNumber(2)} />
        )}
        {tabNumber === 2 && <Agendamento />}
      </Frame>
    </WrapperDefault>
  );
}

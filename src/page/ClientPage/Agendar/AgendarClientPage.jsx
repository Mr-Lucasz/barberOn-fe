import { WrapperDefault } from "../../../components/util/WrapperDefault";
import { Header } from "../../../components/Header";
import { Frame } from "../../../components/Client/Frame";
import { BarberOption } from "../../../components/Client/BarberOption";
import { ServicoOption } from "../../../components/Client/ServicoOption";
import styles from "./AgendarClientPage.module.css";
import { useState } from "react";

export function AgendarClientPage() {
  const [tabNumber, setTabNumber] = useState(0);

  const homePageBarberLinks = [
    { href: "/home", text: "Home" },
    { href: "/home/agenda", text: "Agendar" },
    { href: "/home/service", text: "Histórico" },
  ];

  return (
    <WrapperDefault>
      <Header
        showButton={false}
        isHomePageClient={true}
        links={homePageBarberLinks}
      />
      <Frame setTabNumber={setTabNumber}>
        {tabNumber === 0 && <BarberOption />}
        {tabNumber === 1 && <ServicoOption />}
      </Frame>
    </WrapperDefault>
  );
}

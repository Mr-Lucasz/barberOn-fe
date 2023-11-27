import { WrapperDefault } from "../../../components/util/WrapperDefault";
import { Header } from "../../../components/Header";
import { Frame } from "../../../components/Client/Frame";
import { ServiceOption } from "../../../components/Client/ServiceOption";
import styles from "./AgendarClientPage.module.css";



export function AgendarClientPage() {
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
      <Frame>
        <ServiceOption/>
      </Frame>
    </WrapperDefault>
  );
}

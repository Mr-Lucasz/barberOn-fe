import { BoxSection } from "../../../components/BoxSection";
import styles from "./SecondSection.module.css";
import Tesoura from "../../../assets/tesoura1.svg";
import Barba from "../../../assets/corte-de-barba 1.svg";
import Maquina from "../../../assets/barbeador 1.svg";
import Acabamento from "../../../assets/penteado 1.svg";
import { TitleTopic } from "../../../components/util/TitleTopic";

export function SecondSection() {
  return (
    <>
      <TitleTopic title="Nossos Serviços" id="services" />
      <div className={styles["box-services"]}>
        <BoxSection
          img={Tesoura}
          heading="Corte"
          description="Nossa equipe oferece cortes que variam do clássico ao contemporâneo, garantindo uma aparência única e elegante."
        />
        <BoxSection
          img={Maquina}
          heading="Máquina"
          description="Cortes modernos e ousados, proporcionando um visual distinto e contemporâneo."
        />
        <BoxSection
          img={Acabamento}
          heading="Acabamento"
          description="Nossos profissionais cuidam dos detalhes finais, garantindo que você saia com uma aparência impecável e sofisticada."
        />
        <BoxSection
          img={Barba}
          heading="Barba"
          description="Estilização de barba de acordo com suas preferências, resultando em um visual único e bem cuidado."
        />
      </div>
    </>
  );
}

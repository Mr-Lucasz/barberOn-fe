import { Header } from "../../../components/Header.jsx";
import { WrapperDefault } from "../../../components/util/WrapperDefault.jsx";
import styles from "./AgendarClientPage.module.css";

export function AgendarClientPage() {


  const homePageBarberLinks = [
    { href: "/homeclient", text: "Home" },
    { href: "/homeclient/agendar", text: "Agendar" },
    { href: "/homeclient/historico", text: "Historico" },
  ];

  const barbers = [
    { id: 1, name: 'Barbeiro 1', image: 'imgdobarbeiro.jpg' },
    { id: 2, name: 'Barbeiro 2', image: 'teste.jpg' },
    { id: 3, name: 'Barbeiro 3', image: 'teste.jpg' },
    { id: 4, name: 'Barbeiro 4', image: 'teste.jpg' },
    // Adicione mais barbeiros conforme necessário
  ];

  return (
    <WrapperDefault>
      <Header
        showButton={false}
        isHomePageBarber={true}
        links={homePageBarberLinks}
      />
    <div className={styles.container}>
      <span className={`${styles.textXl} ${styles.fontBold}`}>Agendar com um Barbeiro</span>
      
      <ul className={styles.barberList}>
        {barbers.map((barber) => (
          <li key={barber.id} className={styles.barberItem}>
            <img src={barber.image} alt={barber.name} className={styles.barberImage} />
            <h3>{barber.name}</h3>
            <button onClick={() => selectBarber(barber.name)}>Selecionar</button>
          </li>
        ))}
      </ul>
    </div>
    </WrapperDefault>
  );
}


function selectBarber(barberName) {
  alert('Você selecionou o barbeiro: ' + barberName);
  // Adicione lógica para lidar com a seleção do barbeiro (por exemplo, redirecionar para outra página)
}
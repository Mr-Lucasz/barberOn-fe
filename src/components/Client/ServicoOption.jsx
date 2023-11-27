import styles from "./ServicoOption.module.css";
import { BoxItemService } from "./BoxItemService";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import propTypes from "prop-types";

const mockData = [
  {
    id: 1,
    name: "Corte",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 2,
    name: "Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 3,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 4,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 5,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 6,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 7,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
  {
    id: 8,
    name: "Corte e Barba",
    valor: "50",
    serviceHora: "1",
    serviceMinuto: "30",
    serviceDescount: "10",
  },
];

export function ServicoOption({ onReserveButtonClick }) {
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleServiceSelection = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(
        selectedServices.filter((serviceId) => serviceId !== id)
      );
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  useEffect(() => {
    const start = (page - 1) * 4;
    const end = start + 4;
    setDisplayData(mockData.slice(start, end));
  }, [page]);

  return (
    <div className={styles.wrapperTwo}>
      <div className={styles.containerButton}>
        <button
          className={styles.buttonReservar}
          disabled={selectedServices.length === 0}
          onClick={onReserveButtonClick}
        >
          RESERVAR
        </button>
      </div>
      <div className={styles.serviceItem}>
        {displayData.length === 0 ? (
          <div className={styles.noResults}>Nenhum resultado</div>
        ) : (
          displayData.map((servico) => (
            <BoxItemService
              key={servico.id}
              serviceName={servico.name}
              servicePrice={servico.valor}
              serviceHour={servico.serviceHora}
              serviceMinutes={servico.serviceMinuto}
              serviceDescount={servico.serviceDescount}
              isSelected={selectedServices.includes(servico.id)}
              onServiceSelect={() => toggleServiceSelection(servico.id)}
              isReserveButtonDisabled={selectedServices.length === 0}
              onReserveButtonClick={onReserveButtonClick}
            />
          ))
        )}
      </div>
      <Pagination
        count={Math.ceil(mockData.length / 4)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}

ServicoOption.propTypes = {
  onReserveButtonClick: propTypes.func.isRequired,
};

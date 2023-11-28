import styles from "./ServicoOption.module.css";
import { BoxItemService } from "./BoxItemService";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";



export function ServicoOption({ onReserveButtonClick }) {
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [services, setServices] = useState([]);
  
  const toggleServiceSelection = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(
        selectedServices.filter((serviceId) => serviceId !== id)
      );
    } else {
      setSelectedServices([...selectedServices, id]);
    }
    localStorage.setItem("serviceIds", JSON.stringify(selectedServices)); 
  };

  useEffect(() => {
    const barberId = localStorage.getItem("barberId");
    axios
      .get(`http://localhost:8080/api/servicos/${barberId}`)
      .then((response) => setServices(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const start = (page - 1) * 4;
    const end = start + 4;
    setDisplayData(services.slice(start, end));
  }, [page, services]);
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
              key={servico.servicoId}
              serviceName={servico.servicoTitulo}
              servicePrice={servico.servicoValor}
              serviceHour={servico.servicoTempoHora}
              serviceMinutes={servico.servicoTempoMinuto}
              serviceDescount={0}
              isSelected={selectedServices.includes(servico.servicoId)}
              onServiceSelect={() => toggleServiceSelection(servico.servicoId)}
              isReserveButtonDisabled={selectedServices.length === 0}
              onReserveButtonClick={onReserveButtonClick}
            />
          ))
        )}
      </div>
      <Pagination
        count={Math.ceil(services.length / 4)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}

ServicoOption.propTypes = {
  onReserveButtonClick: propTypes.func.isRequired,
};

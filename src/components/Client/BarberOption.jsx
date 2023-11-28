import styles from "./BarberOption.module.css";
import iconSearch from "../../assets/iconSearch.svg";
import { Select } from "../util/Select.jsx";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { BoxItemBarber } from "./BoxItemBarber.jsx";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";
import propTypes from "prop-types";
import axios from "axios";

export function BarberOption({ setTabNumber }) {
  const [avalicaoFilter, setAvaliacaoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);
  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/barbeiros")
      .then((response) => setBarbers(response.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log("User in localStorage:", localStorage.getItem("user"));
    const start = (page - 1) * 4;
    const end = start + 4;
    setDisplayData(barbers.slice(start, end));
  }, [barbers, page]);


  const getDayOfWeek = () => {
    const days = [
      "Domingo",
      "Segunda - Feira",
      "Terça - Feira",
      "Quarta - Feira",
      "Quinta - Feira",
      "Sexta - Feira",
      "Sábado",
    ];
    const date = new Date();
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
  };

  const getStatusForToday = (barbeiro) => {
    const today = getDayOfWeek();
    const todayAgenda = barbeiro.agendas.find(
      (agenda) => agenda.agendaDiaSemana === today
    );
    return todayAgenda ? todayAgenda.statusNome : "Indisponível";
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAvaliacaoFilterChange = (event) => {
    setAvaliacaoFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleFilter = () => {
    let url = "http://localhost:8080/api/barbeiros";

    if (avalicaoFilter) {
      url += `avaliacao=${avalicaoFilter}&`;
    }

    if (statusFilter) {
      url += `status=${statusFilter}&`;
    }

    if (search) {
      url += `q=${search}&`;
    }

    axios
      .get(url)
      .then((response) => setBarbers(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const start = (page - 1) * 4;
    const end = start + 4;
    setDisplayData(barbers.slice(start, end));
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [avalicaoFilter, statusFilter, search]);

  const selectOptionsStatus = [
    { value: "Disponível", label: "Disponível" },
    { value: "Indisponível", label: "Indisponível" },
  ];

  const selectOptionsAvaliacao = [
    { value: "1", label: "1 star" },
    { value: "2", label: "2 star" },
    { value: "3", label: "3 star" },
    { value: "4", label: "4 star" },
    { value: "5", label: "5 star" },
  ];

  return (
    <div className={styles.wrapperOne}>
      <div className={styles.filterContainer}>
        <TextField
          value={search}
          onChange={handleSearchChange}
          label="Search"
          variant="outlined"
          fullWidth
        />

        <div className={styles.filterAvaliacao}>
          <Select
            value={avalicaoFilter}
            onChange={handleAvaliacaoFilterChange}
            options={selectOptionsAvaliacao}
            name="filterSelect"
            id="filterSelectAvaliacao"
            defaultOptionLabel="AVALIAÇÃO"
          />
        </div>
        <div className={styles.filterStatus}>
          <Select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            options={selectOptionsStatus}
            name="filterSelect"
            id="filterSelectStatus"
            defaultOptionLabel="STATUS"
          />
        </div>

        <button className={styles.filterButton} onClick={handleFilter}>
          <img src={iconSearch} alt="filter" />
        </button>
      </div>
      <div className={styles.barberItem}>
        {displayData.length === 0 ? (
          <div className={styles.noResults}>Nenhum resultado</div>
        ) : (
          displayData.map((barbeiro) => (
            
            <BoxItemBarber
              key={barbeiro.id}
              name={barbeiro.nome}
              imgClassName={styles.imgBarber}
              stars={barbeiro.mediaAvaliacao}
              status={getStatusForToday(barbeiro)}
              onChooseServiceButtonClick={() => {
                localStorage.setItem("barberId", barbeiro.id);
                setTabNumber(1);
              }}
     
            />
          ))
        )}
      </div>
      <Pagination
        count={Math.ceil(barbers.length / 4)}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}

BarberOption.propTypes = {
  setTabNumber: propTypes.func.isRequired,
};

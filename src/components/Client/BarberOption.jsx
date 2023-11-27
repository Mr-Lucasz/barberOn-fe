import styles from "./BarberOption.module.css";
import iconSearch from "../../assets/iconSearch.svg";
import { Select } from "../util/Select.jsx";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { BoxItemBarber } from "./BoxItemBarber.jsx";
import Pagination from "@mui/material/Pagination";
import { useEffect } from "react";

const mockData = [
  {
    id: 1,
    name: "Barbeiro 1",
    status: "Disponível",
    stars: "4",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Barbeiro 2",
    status: "Indisponível",
    stars: "3",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Barbeiro 3",
    status: "Disponível",
    stars: "5",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Barbeiro 4",
    status: "Indisponível",
    stars: "2",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Barbeiro 5",
    status: "Indisponível",
    stars: "2",
    image: "https://via.placeholder.com/150",
  },
];

export function BarberOption() {
  const [avalicaoFilter, setAvaliacaoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState([]);

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
    let filteredData = mockData;

    if (avalicaoFilter) {
      filteredData = filteredData.filter(
        (barbeiro) => barbeiro.stars === avalicaoFilter
      );
    }

    if (statusFilter) {
      filteredData = filteredData.filter(
        (barbeiro) => barbeiro.status === statusFilter
      );
    }

    if (search) {
      filteredData = filteredData.filter((barbeiro) =>
        barbeiro.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayData(filteredData.slice(0, 4));
    setPage(1);
  };

  useEffect(() => {
    const start = (page - 1) * 4;
    const end = start + 4;
    setDisplayData(mockData.slice(start, end));
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
              imgClassName={styles.imgBarber}
              stars={barbeiro.stars}
              status={barbeiro.status}
            >
              {barbeiro.name}
            </BoxItemBarber>
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

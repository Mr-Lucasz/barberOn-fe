

import styles from "./ServiceOption.module.css";
import iconSearch from "../../assets/iconSearch.svg";
import { Select } from "../util/Select.jsx";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { BoxItemBarber } from "./BoxItemBarber.jsx";
import Pagination from "@mui/material/Pagination";

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
];


export function ServiceOption() {
  const [avalicaoFilter, setAvaliacaoFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // update handler as well
  const handleAvaliacaoFilterChange = (event) => {
    setAvaliacaoFilter(event.target.value);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

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
        />

        <div className={styles.filterAvaliacao}>
          <Select
            value={avalicaoFilter} // use avalicaoFilter here
            onChange={handleAvaliacaoFilterChange} // update handler
            options={selectOptionsAvaliacao}
            name="filterSelect"
            id="filterSelectAvaliacao"
            defaultOptionLabel="AVALIAÇÃO"
          />
        </div>
        <div className={styles.filterStatus}>
          <Select
            value={statusFilter} // use statusFilter here
            onChange={handleStatusFilterChange} // update handler
            options={selectOptionsStatus}
            name="filterSelect"
            id="filterSelectStatus"
            defaultOptionLabel="STATUS"
          />
        </div>

        <button className={styles.filterButton}>
          <img src={iconSearch} alt="filter" />
        </button>
      </div>

      <div className={styles.barberItem}>
      {mockData.map((barbeiro) => (
        <BoxItemBarber
          key={barbeiro.id}
          imgClassName={styles.imgBarber}
          stars={barbeiro.stars}
        >
          {barbeiro.name}
        </BoxItemBarber>
      ))}

      </div>
      <Pagination count={5} page={page} onChange={handlePageChange} />
    </div>
  );
}

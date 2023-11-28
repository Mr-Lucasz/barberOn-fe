// Agendamento.jsx
import styles from "./Agendamento.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TableAgendamento } from "./TableAgendamento";

const mockTableData = [
  {
    barbeiro: "Barbeiro 1",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 2",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 3",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 4",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 5",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 6",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 7",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 8",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
  {
    barbeiro: "Barbeiro 9",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  }
];

export function Agendamento() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const itemsPerPage = 8;
  const offset = (currentPage - 1) * itemsPerPage;
  const pagedData = mockTableData.slice(offset, offset + itemsPerPage);
  const serviceIds = JSON.parse(localStorage.getItem("serviceIds"));
  const barbeId = JSON.parse(localStorage.getItem("barberId"));

  const handleClickAgendar = () => {
    alert("Agendado com sucesso!");
    console.log(serviceIds);
    console.log(barbeId);
  }

  return (
    <div className={styles.wrapperThree}>
      <div className={styles.filterContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Escolha uma data" />
          </DemoContainer>
        </LocalizationProvider>

        <div className={styles.filterSelect}>
          <select className={styles.select}>
            <option>Selecione um horário</option>
            <option>MANHÃ</option>
            <option>TARDE</option>
            <option>NOITE</option>
          </select>
        </div>
        <div className={styles.filterSelectHorario}>
          <select className={styles.select}>
            <option>Selecione um horário</option>
            <option>09:00</option>
            <option>09:00</option>
            <option>09:00</option>
          </select>
        </div>
        <div className={styles.btnAgendar}>
          <button onClick={handleClickAgendar}>AGENDAR</button>
        </div>
      </div>

      <div className={styles.filterSearch}>
        <TextField
          value={search}
          onChange={handleSearchChange}
          label="Possui Cupom de Desconto? Nos Informe!"
          variant="outlined"
          fullWidth
        />
      </div>
      <div className={styles.tableContainer}>
      <TableAgendamento data={pagedData} totalItems={mockTableData.length} onPageChange={setCurrentPage} />
    </div>
    </div>
  );
}

// Agendamento.jsx
import styles from "./Agendamento.module.css";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { TableAgendamento } from "./TableAgendamento";
import { CustomDatePicker } from "../util/CustomDatePicker";

const mockTableData = [
  {
    barbeiro: "Barbeiro 1",
    servico: "Corte",
    horario: "09:00",
    valor: "R$ 50,00",
    acoes: "Ações",
  },
];

const dayOfWeekMap = {
  0: "Domingo",
  1: "Segunda - Feira",
  2: "Terça - Feira",
  3: "Quarta - Feira",
  4: "Quinta - Feira",
  5: "Sexta - Feira",
  6: "Sábado",
};

const periodRanges = {
  MANHÃ: { start: 6, end: 12 },
  TARDE: { start: 13, end: 17 },
  NOITE: { start: 18, end: 23 },
};

export function Agendamento() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState("");
  const itemsPerPage = 8;
  const offset = (currentPage - 1) * itemsPerPage;
  const pagedData = mockTableData.slice(offset, offset + itemsPerPage);
  const serviceIds = JSON.parse(localStorage.getItem("serviceIds"));
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [availableTimes, setAvailableTimes] = useState([]);
  const barbeId = JSON.parse(localStorage.getItem("barberId"));

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleClickAgendar = () => {
    alert("Agendado com sucesso!");
    console.log(serviceIds);
    console.log(barbeId);
  };

  useEffect(() => {
    const selectedDate = new Date(date);
    fetchAvailableTimes(barbeId, selectedDate);
  }, [barbeId, date]);

  async function fetchAvailableTimes(barberId, selectedDate) {
    try {
      const response = await fetch(
        `http://localhost:8080/api/barbeiros/${barberId}/agendas`
      );
      const schedules = await response.json();

      const dayOfWeek = dayOfWeekMap[selectedDate.getDay()];

      const daySchedule = schedules.find(
        (schedule) => schedule.agendaDiaSemana === dayOfWeek
      );

      const startTime = parseInt(daySchedule.agendaHorarioInicio.split(":")[0]);
      const endTime = parseInt(daySchedule.agendaHorarioFim.split(":")[0]);

      const times = [];

      for (let i = startTime; i < endTime; i++) {
        times.push(`${i.toString().padStart(2, "0")}:00`);
      }

      setAvailableTimes(times);
    } catch (error) {
      console.error("Error fetching available times:", error);
    }
  }

  function handlePeriodChange(event) {
    setPeriod(event.target.value);
  }
  
  function handleDateChange(newDate) {
    setDate(newDate);
    const selectedDate = new Date(newDate);
    selectedDate.setDate(selectedDate.getDate() + 1);
    fetchAvailableTimes(barbeId, selectedDate);
  }

  return (
    <div className={styles.wrapperThree}>
      <div className={styles.filterContainer}>
        <div className={styles.filterDate}>
          <CustomDatePicker onDateChange={handleDateChange} />
        </div>

        <div className={styles.filterSelect}>
          <select className={styles.select} onChange={handlePeriodChange}>
            <option value="">Selecione um Periodo</option>
            <option value="MANHÃ">MANHÃ</option>
            <option value="TARDE">TARDE</option>
            <option value="NOITE">NOITE</option>
          </select>
        </div>
        <div className={styles.filterSelectHorario}>
          <select className={styles.select}>
            <option>Selecione um horário</option>
            {availableTimes.map((time) => (
              <option key={time}>{time}</option>
            ))}
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
        <TableAgendamento
          data={pagedData}
          totalItems={mockTableData.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

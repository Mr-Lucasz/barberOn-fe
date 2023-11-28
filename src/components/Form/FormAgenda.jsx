import styles from "./FormAgenda.module.css";
import { FormUtil } from "../util/FormUtil";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "../util/Button";
import Modal from "../util/Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import { PauseFormAgenda } from "./Agenda/PauseFormAgenda.jsx";
import PropTypes from "prop-types";

import dayjs from "dayjs";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "white",
          "&.Mui-checked:hover": {
            cursor: "pointer",
          },
          "&.Mui-checked": {
            color: "#030979",
          },
          "&.Mui-checked + .MuiSwitch-track": {
            backgroundColor: "#030979",
          },
        },
      },
    },
  },
});

const dias = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function FormAgenda({ isEditMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [status, setStatus] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDay, setSelectDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [pauses, setPauses] = useState([]);
  const [startPause, setStartPause] = useState("");
  const [endPause, setEndPause] = useState("");
  const [isChecked, setIsChecked] = useState({});
  const [agenda, setAgenda] = useState([]);
  const [isNewPause, setIsNewPause] = useState(false);

  const handleClickEdit = (dia) => {
    setSelectDay(dia.agendaDiaSemana);
    setStart(dayjs(`1970-01-01T${dia.agendaHorarioInicio}`));
    setEnd(dayjs(`1970-01-01T${dia.agendaHorarioFim}`));
    setPauses(dia.pausas);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const barberDataString = localStorage.getItem('user');
        if (barberDataString) {
          const barberData = JSON.parse(barberDataString);
          const barberId = barberData.id;
  
          const response = await axios.get(
            `http://localhost:8080/api/barbeiros/${barberId}/agendas`
          );
          const barberDetails = response.data;
          setAgenda(barberDetails);
  
          // Adicione este bloco de código para definir o estado isChecked
          const newIsChecked = {};
          barberDetails.forEach((agenda) => {
            newIsChecked[agenda.agendaDiaSemana] =
              agenda.status.statusNome === "Disponível";
          });
          setIsChecked(newIsChecked);
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    if (isEditMode) {
      fetchBarberData();
    }
  }, [isEditMode, navigate]);

  const handleClickUpdate = async (event) => {
    event.preventDefault();

    if (isEditMode) {
      try {
        updateAgendaHour(agenda.agendaId, start, end);
        updateAgendaPause(pauses, agenda);
        const updatedAgenda = {
          agendaHorarioInicio: start.format("HH:mm:ss"),
          agendaHorarioFim: end.format("HH:mm:ss"),
          pausas: pauses.map((pause) => ({
            pausaHorarioInicio: pause.pausaHorarioInicio,
            pausaHorarioFim: pause.pausaHorarioFim,
          })),
        };
        const barberId = JSON.parse(localStorage.getItem("user")).id;
        const response = await axios.patch(
          `http://localhost:8080/api/barbeiros/${barberId}/agendas`,
          updatedAgenda
        );

        console.log(response);
        alert("Agenda atualizada com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar a agenda");
      }
    }
  };

  const handleClickCancelar = () => setIsModalOpen(false);

  const addPause = (pause) => {
    event.preventDefault();

    const newPause = {
      pausaHorarioInicio: pause.pausaHorarioInicio,
      pausaHorarioFim: pause.pausaHorarioFim,
    };

    setPauses([...pauses, newPause]);
    setIsNewPause(true);
  };

  const deletePauseApi = (pausaId, index) => {


    axios
      .delete(`http://localhost:8080/api/pausas/${pausaId}`)
      .then((response) => {
        console.log(response);
        const newPauses = pauses.filter((_, i) => i !== index);
        setPauses(newPauses);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deletePause = (index) => {
    event.preventDefault();
    if (isNewPause) {
      const newPauses = pauses.filter((_, i) => i !== index);
      setPauses(newPauses);
      setIsNewPause(false);
    } else {
      const selectedDayAgenda = agenda.find(
        (dia) => dia.agendaDiaSemana === selectDay
      );
      const newPausas = selectedDayAgenda.pausas.filter(
        (pausa, i) => i !== index
      );
      const newAgenda = agenda.map((dia) =>
        dia.agendaDiaSemana === selectDay
          ? { ...dia, pausas: newPausas }
          : { ...dia }
      );
      setAgenda(newAgenda);
      if (pauses[index].pausaId) {
        deletePauseApi(pauses[index].pausaId, index);
      }
    }
  };

  const updateAgendaHour = (agendaId, start, end) => {
    const barberId = JSON.parse(localStorage.getItem("user")).id;
    const apiUrl = isEditMode
      ? `http://localhost:8080/api/barbeiros/${barberId}/agendas/${agendaId}`
      : `http://localhost:8080/api/barbeiros/${id}/agendas/${agendaId}`;
    axios
      .patch(apiUrl, {
        agendaHorarioInicio: start.format("HH:mm:ss"),
        agendaHorarioFim: end.format("HH:mm:ss"),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateAgendaPause = (pauses, selectedDayAgenda) => {
    const barberId = JSON.parse(localStorage.getItem("user")).id;
    const apiUrl = isEditMode
      ? `http://localhost:8080/api/barbeiros/${barberId}/agendas/${selectedDayAgenda.agendaId}/pausas`
      : `http://localhost:8080/api/barbeiros/${id}/agendas/${selectedDayAgenda.agendaId}/pausas`;
    axios
      .patch(apiUrl,
        {
          pausas: pauses.map((pause) => ({
            pausaHorarioInicio: pause.pausaHorarioInicio,
            pausaHorarioFim: pause.pausaHorarioFim,
          })),
        }
      )
      .then((response) => {
        console.log(response);
        const barberId = JSON.parse(localStorage.getItem("user")).id;
        const apiUrl = isEditMode
          ? `http://localhost:8080/api/barbeiros/${barberId}/agendas`
          : `http://localhost:8080/api/barbeiros/${id}/agendas`;
        axios
          .get(apiUrl)
          .then((response) => {
            setAgenda(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickSalvar = () => {
    event.preventDefault();
    console.log(
      "Saving pause with start time:",
      startPause,
      "and end time:",
      endPause
    );
    const selectedDayAgenda = agenda.find(
      (dia) => dia.agendaDiaSemana === selectDay
    );
    if (selectedDayAgenda) {
      updateAgendaHour(selectedDayAgenda.agendaId, start, end);
      if (
        isNewPause &&
        JSON.stringify(pauses) !== JSON.stringify(selectedDayAgenda.pausas)
      ) {
        updateAgendaPause(pauses, selectedDayAgenda);
        setIsNewPause(false);
      } else {
        updateAgendaPause(pauses, selectedDayAgenda);
      }
      setIsModalOpen(false);
    } else {
      console.error("No agenda found for the selected day.");
    }
    setIsModalOpen(false);
  };

  const handleClickContinue = () =>{
  
    if (isEditMode) {
      navigate("/home/agenda");
      alert("Agenda atualizada com sucesso!");
    }else{
    navigate(`/register/${id}/step2`)
    }
}
  

  useEffect(() => {
    const barberId = JSON.parse(localStorage.getItem("user")).id;
    const apiUrl = isEditMode
      ? `http://localhost:8080/api/barbeiros/${barberId}/agendas`
      : `http://localhost:8080/api/barbeiros/${id}/agendas`;

    if (isEditMode) {
    axios
      .get(apiUrl)
      .then((response) => {
        const agenda = response.data[0];
        setStart(agenda.agendaHorarioInicio);
        setEnd(agenda.agendaHorarioFim);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, [id]);

  const generateInitialAgendas = () => {
    const diasSemana = [
      "Domingo",
      "Segunda - Feira",
      "Terça - Feira",
      "Quarta - Feira",
      "Quinta - Feira",
      "Sexta - Feira",
      "Sábado",
    ];
    const horarioInicio = "08:00:00";
    const horarioFim = "18:00:00";
    const statusId = 1;
    const pausa = [];
    const newAgendas = diasSemana.map((dia) => ({
      agendaDiaSemana: dia,
      agendaHorarioInicio: horarioInicio,
      agendaHorarioFim: horarioFim,
      statusId: statusId,
      pausas: pausa,
    }));
    return newAgendas;
  };

  const updateStatus = (agendaId, isChecked) => {

    const statusId = isChecked ? 1 : 2;
    const barberId = JSON.parse(localStorage.getItem("user")).id;
    const apiUrl = isEditMode
      ? `http://localhost:8080/api/barbeiros/${barberId}/agendas/${agendaId}`
      : `http://localhost:8080/api/barbeiros/${id}/agendas/${agendaId}`;
    axios
      .patch(apiUrl, {
        statusId: statusId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const barberId = JSON.parse(localStorage.getItem("user")).id;
    const apiUrl = isEditMode
      ? `http://localhost:8080/api/barbeiros/${barberId}/agendas`
      : `http://localhost:8080/api/barbeiros/${id}/agendas`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.length === 0) {
          const newAgendas = generateInitialAgendas();
          axios
            .post(
              `http://localhost:8080/api/barbeiros/${id}/agendas`,
              newAgendas
            )
            .then((response) => {
              const sortedAgenda = response.data.sort(
                (a, b) =>
                  dias.indexOf(a.agendaDiaSemana) -
                  dias.indexOf(b.agendaDiaSemana)
              );
              setAgenda(sortedAgenda);
              const newIsChecked = {};
              const newStatus = {};
              response.data.forEach((agenda) => {
                newIsChecked[agenda.agendaDiaSemana] =
                  agenda.status.statusNome === "Disponível";
                newStatus[agenda.agendaDiaSemana] = agenda.status.statusNome;
              });
              setIsChecked(newIsChecked);
              setStatus(newStatus);
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (response.data.length > 0) {
          const sortedAgenda = response.data.sort(
            (a, b) =>
              dias.indexOf(a.agendaDiaSemana) - dias.indexOf(b.agendaDiaSemana)
          );
          setAgenda(sortedAgenda);
          const newIsChecked = {};
          const newStatus = {};
          response.data.forEach((agenda) => {
            newIsChecked[agenda.agendaDiaSemana] =
              agenda.status.statusNome === "Disponível";
            newStatus[agenda.agendaDiaSemana] = agenda.status.statusNome;
          });
          setIsChecked(newIsChecked);
          setStatus(newStatus);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <FormUtil>
      <div className={styles.headerForm}>
        <h1 className={styles.title}>Agenda</h1>
        <span>Informe seu horário de trabalho.</span>
      </div>
      {agenda.map((dia, index) => (
        <div key={index} className={styles.agendaSection}>
          <div className={styles.switch}>
            <ThemeProvider theme={theme}>
              <Switch
                key={dia.agendaId}
                checked={isChecked[dia.agendaDiaSemana]}
                onChange={() => {
                  const newIsChecked = !isChecked[dia.agendaDiaSemana];
                  setIsChecked((prevIsChecked) => ({
                    ...prevIsChecked,
                    [dia.agendaDiaSemana]: newIsChecked,
                  }));
                  const newStatusName = newIsChecked
                    ? "Disponível"
                    : "Indisponível";
                  const newStatusId = newIsChecked ? 1 : 2;
                  const newAgenda = agenda.map((item) =>
                    item.agendaId === dia.agendaId
                      ? {
                          ...item,
                          status: {
                            id: newStatusId,
                            statusNome: newStatusName,
                          },
                        }
                      : item
                  );
                  setAgenda(newAgenda);
                  updateStatus(dia.agendaId, newIsChecked);
                }}
              />
            </ThemeProvider>
            <label className={styles.switchLabel}>{dia.agendaDiaSemana}</label>

            <Chip
              key={dia.agendaId}
              label={dia.status.statusNome}
              color={isChecked[dia.agendaDiaSemana] ? "success" : "error"}
              style={{
                backgroundColor: isChecked[dia.agendaDiaSemana]
                  ? ""
                  : "#9A3648",
              }}
            />
          </div>

          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            style={{
              zIndex: 1,
              backgroundColor: isChecked[dia.agendaDiaSemana]
                ? "#030979"
                : "var(--black-012, rgba(0, 0, 0, 0.12)",
            }}
            disabled={!isChecked[dia.agendaDiaSemana]}
            onClick={() => {
              handleClickEdit(dia);
            }}
          >
            <EditIcon />
          </Fab>
          {isModalOpen && (
            <Modal
              isModalOpen={isModalOpen}
              closeModal={() => setIsModalOpen(false)}
              modalTitle={selectDay}
              childrenSubtitle={"Defina seu horário comercial aqui."}
              contentModal={
                <>
                  <h3 className={styles.h2Modal}>Horário de funcionamento</h3>
                  <div className={styles.horario}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={["TimePicker"]}>
                        <TimePicker
                          key={dia.agendaId}
                          label="Horário de Início"
                          onChange={setStart}
                          value={start}
                        />
                        <TimePicker
                          key={dia.agendaId}
                          label="Horárido de Fim"
                          onChange={setEnd}
                          value={end}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <h3 className={styles.h2Modal}>Pausas</h3>
                  {pauses.map((pause, index) => (
                    <PauseFormAgenda
                      key={pause.pausaId}
                      pause={pause}
                      index={index}
                      deletePause={deletePause}
                      onStartPauseChange={(newStartTime, index) => {
                        const newPause = {
                          ...pause,
                          pausaHorarioInicio: newStartTime,
                        };
                        const newPauses = pauses.map((item, i) =>
                          i === index ? newPause : item
                        );
                        setPauses(newPauses);
                      }}
                      onEndPauseChange={(newEndTime, index) => {
                        const newPause = {
                          ...pause,
                          pausaHorarioFim: newEndTime,
                        };
                        const newPauses = pauses.map((item, i) =>
                          i === index ? newPause : item
                        );
                        setPauses(newPauses);
                      }}
                    />
                  ))}
                  <button
                    className={styles.buttonModalPause}
                    onClick={addPause}
                  >
                    Add Pausa +
                  </button>

                  <div className={styles.btnGroup}>
                    <button
                      className={styles.buttonModalCancel}
                      onClick={handleClickCancelar}
                    >
                      Cancelar
                    </button>
                    <button
                      className={styles.buttonModalSalvar}
                      onClick={handleClickSalvar}
                    >
                      Salvar
                    </button>
                  </div>
                </>
              }
            />
          )}
        </div>
      ))}

      <footer className={styles.formFooter}>
        {isEditMode ? (
                    <Button
                    color="blue"
                    size="large"
                    buttonName={"ATUALIZAR"}
                    onClick={handleClickContinue}
                    style={{ backgroundColor: "#030979", color: "white" }}
                  />

        ) : (
          <Button
            color="blue"
            size="large"
            buttonName={"CONTINUAR"}
            onClick={handleClickContinue}
            style={{ backgroundColor: "#030979", color: "white" }}
          />
        )}
      </footer>
    </FormUtil>
  );
}
FormAgenda.propTypes = {
  isEditMode: PropTypes.bool,
};

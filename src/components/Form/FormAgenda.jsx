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
import { handleClickUpdate } from "../../components/Form/Agenda/functions.js";

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: "white",
          // hover
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
    //style Fab
  },
});

export function FormAgenda({ isEditMode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [diaDaSemana, setDiaDaSemana] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
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

  const handleClickEdit = (agenda) => {
    setSelectDay(agenda.agendaDiaSemana);
    setStart(agenda.agendaHorarioInicio);
    setEnd(agenda.agendaHorarioFim);
    setIsModalOpen(true);
  };
  const handleClickCancelar = () => {
    setIsModalOpen(false);
  };

  const addPause = (pause) => {
    setPauses([...pauses, pause]);
  };

  const deletePause = (index) => {
    const newPauses = [...pauses];
    newPauses.splice(index, 1);
    setPauses(newPauses);
  };

  const handleClickSalvar = () => {
    setIsModalOpen(false);
    agenda.filter((dia) => dia.dia !== selectDay);
    agenda.push({
      dia: selectDay,
      start: start,
      end: end,
      pauses: pauses,
    });
    setDiaDaSemana(agenda);
    setIsEdit(false);
  };

  const handleClickContinue = () => {
    navigate("/barbeiro/form/conta");
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/barbeiros/${id}/agendas`)
      .then((response) => {
          const agenda = response.data[0]; // Substitua 0 pelo índice da agenda que você quer usar
          setStart(agenda.agendaHorarioInicio);
          setEnd(agenda.agendaHorarioFim);
 
      })
      .catch((error) => {
        console.error(error);
      });
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
  //função uptade status que chama endpoint patch
  const updateStatus = (agendaId, isChecked) => {
    const statusId = isChecked ? 1 : 2; // 1 para "Disponível" (ON), 2 para "Indisponível" (OFF)
    axios
      .patch(`http://localhost:8080/api/barbeiros/952/agendas/${agendaId}`, {
        statusId: statusId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  axios
    .get("http://localhost:8080/api/barbeiros/952/agendas")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  useEffect(() => {
    fetch("http://localhost:8080/api/barbeiros/952/agendas")
      .then((response) => response.json())
      .then((data) => setAgenda(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/barbeiros/${id}/agendas`)
      .then((response) => {
        if (response.data.length === 0) {
          // Se não existem agendas cadastradas, gerar as agendas iniciais e enviar uma solicitação POST para salvar as agendas no backend
          const newAgendas = generateInitialAgendas();
          axios
            .post(
              `http://localhost:8080/api/barbeiros/${id}/agendas`,
              newAgendas
            )
            .then((response) => {
              setAgenda(response.data);
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
          // Se já existem agendas cadastradas, atualizar o estado com as agendas existentes
          setAgenda(response.data);
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
          {/* SWITCH BUTTON ON/OFF - Status disponivel ou Indisponivel*/}
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
            {/* usar função statuChip */}

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
                          label="Horário de Início"
                          onChange={setStart}
                          value={start}
                        />
                        <TimePicker
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
                      key={index}
                      pause={pause}
                      index={index}
                      deletePause={deletePause}
                      setStartPause={setStartPause}
                      setEndPause={setEndPause}
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
            onClick={(event) =>
              handleClickUpdate(event, user, setUser, id, agenda)
            }
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

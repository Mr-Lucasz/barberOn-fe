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
import Trash from "../../assets/Trash.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";

// const diaDaSemana = [
//   { id: 1, dia: "Segunda - Feira" },
//   { id: 2, dia: "Terça - Feira" },
//   { id: 3, dia: "Quarta - Feira" },
//   { id: 4, dia: "Quinta - Feira" },
//   { id: 5, dia: "Sexta - Feira" },
//   { id: 6, dia: "Sábado" },
//   { id: 7, dia: "Domingo" },
// ];

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
let agenda = [];

export function FormAgenda() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [diaDaSemana, setDiaDaSemana] = useState([]);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await axios.get("http://localhost:8080/api/status");
      const statusData = result.data.map((status) => ({
        id: status.id,
        nome: status.statusNome,
      }));
      setStatus(statusData);
      const statusMapData = result.data.reduce((acc, status) => {
        acc[status.statusNome] = status.id;
        return acc;
      }, {});
      setStatusMap(statusMapData);
    };

    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchAgendas = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/agendas/barbeiro/${id}`
      );
      const diaDaSemanaData = response.data.agendas.map((agenda) => ({
        id: agenda.agendaId,
        dia: agenda.agendaDiaSemana,
      }));
      setDiaDaSemana(diaDaSemanaData);
    };

    fetchAgendas();
  }, []);

  const [isChecked, setIsChecked] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: false,
  });

  const [status, setStatus] = useState([]);

  useEffect(() => {
    const fetchStatus = async () => {
      const result = await axios.get("http://localhost:8080/api/status");
      const statusData = result.data.map((status) => ({
        id: status.id,
        nome: status.statusNome,
      }));
      setStatus(statusData);
    };

    fetchStatus();
  }, []);

  const [config, setConfig] = useState({
    "Segunda - Feira": null,
    "Terça - Feira": null,
    "Quarta - Feira": null,
    "Quinta - Feira": null,
    "Sexta - Feira": null,
    Sábado: null,
    Domingo: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDay, setSelectDay] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [pauses, setPauses] = useState([]);
  const [startPause, setStartPause] = useState("");
  const [endPause, setEndPause] = useState("");

  const addPause = () => {
    event.preventDefault();
    setPauses([...pauses, { start: "", end: "" }]);
  };

  const deletePause = (index) => {
    setPauses(pauses.filter((_, i) => i !== index));
  };

  const handleClickEdit = (dia) => {
    if (isChecked[dia.id]) {
      console.log("abrir modal");
      setIsModalOpen(true);
      setSelectDay(dia.dia);
      setPauses(config[dia.dia] || []);
    }
  };

  const generateAgenda = () => {
    if (agenda.length === 0) {
      // Se a agenda ainda não foi criada
      diaDaSemana.forEach((dia) => {
        const statusId = isChecked[dia.id]
          ? statusMap["Disponível"]
          : statusMap["Indisponível"];
        agenda.push({
          dia: dia.dia,
          status: statusId,
          workingHours: {
            start: new Date(start).toLocaleTimeString(),
            end: new Date(end).toLocaleTimeString(),
            pauses: pauses.map(() => ({
              start: new Date(startPause).toLocaleTimeString(),
              end: new Date(endPause).toLocaleTimeString(),
            })),
          },
        });
      });
    } else {
      // Se a agenda já foi criada, apenas atualize-a
      agenda = agenda.map((dia) => {
        if (dia.dia === selectDay) {
          const statusId = isChecked[dia.id]
            ? statusMap["Disponível"]
            : statusMap["Indisponível"];
          return {
            ...dia,
            status: statusId,
            workingHours: {
              start: new Date(start).toLocaleTimeString(),
              end: new Date(end).toLocaleTimeString(),
              pauses: pauses.map(() => ({
                start: new Date(startPause).toLocaleTimeString(),
                end: new Date(endPause).toLocaleTimeString(),
              })),
            },
          };
        } else {
          return dia;
        }
      });
    }

    return agenda;
  };

  useEffect(() => {
    // Atualiza a agenda sempre que isChecked for alterado
    agenda = diaDaSemana.map((dia) => {
      return {
        ...dia,
        status: !isChecked[dia.id] ? status[0] : status[1],
        workingHours: dia.workingHours,
      };
    });
  }, [isChecked]);

  const handleClickSalvar = () => {
    event.preventDefault();
    agenda = generateAgenda();
    setIsModalOpen(false);
    console.log(agenda);
    alert("Salvo com sucesso!");

    // Atualiza o status do dia que está sendo editado
    setIsChecked({ ...isChecked, [selectDay]: true });
  };
  const handleClickCancelar = () => {
    event.preventDefault();
    console.log("cancelar");
    setIsModalOpen(false);
  };
  
  const updateAgendaStatus = async (agendaId, statusName) => {
    const statusId = statusMap[statusName];
    const response = await fetch(
      `http://localhost:8080/api/agendas/${agendaId}/status/${statusId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      console.log(`Status da agenda ${agendaId} atualizado com sucesso`);
    } else {
      console.error(`Erro ao atualizar o status da agenda ${agendaId}`);
    }
  };

  const handleClickContinue = async () => {
    event.preventDefault();
    agenda = generateAgenda();

    // Atualize o usuário no estado
    setUser({ ...user, workingHours: agenda });

    // Atualize a agenda e as pausas no backend
    const response = await fetch(
      `http://localhost:8080/api/agendas/barbeiro/${id}/bulk`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agenda),
      }
    );
    console.log(response);

    if (response.ok) {
      console.log("Agenda atualizada com sucesso");
    } else {
      console.error("Erro ao atualizar a agenda");
    }

    navigate(`/register/${id}/step2`);
    console.log(agenda);
  };

  useEffect(() => {
    // Atualiza a user sempre que qqr coisa for editar em agenda
    setUser({ ...user, workingHours: agenda });
    console.log(user);
  }, [agenda]);

  return (
    <FormUtil>
      <div className={styles.headerForm}>
        <h1 className={styles.title}>Agenda</h1>
        <span>Informe seu horário de trabalho.</span>
      </div>
      {diaDaSemana.map((dia, index) => (
        <div key={index} className={styles.agendaSection}>
          {/* SWITCH BUTTON ON/OFF */}
          <div className={styles.switch}>
            <ThemeProvider theme={theme}>
              <Switch
                defaultChecked
                checked={isChecked[dia.id]}
                onChange={() => {
                  const newIsChecked = !isChecked[dia.id];
                  setIsChecked({ ...isChecked, [dia.id]: newIsChecked });
                  const statusName = newIsChecked
                    ? "Disponível"
                    : "Indisponível";
                  updateAgendaStatus(dia.id, statusName);
                }}
              />
            </ThemeProvider>
            <label className={styles.switchLabel}> {dia.dia}</label>
            {/* usar função statuChip */}
            <Chip
              label={
                Array.isArray(status) && isChecked[dia.id]
                  ? status.find((s) => s.nome === "Disponível")?.nome
                  : status.find((s) => s.nome === "Indisponível")?.nome
              }
              color={isChecked[dia.id] ? "success" : "error"}
              style={{ backgroundColor: isChecked[dia.id] ? "" : "#9A3648" }}
            />
          </div>

          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            style={{
              zIndex: 1,
              backgroundColor: isChecked[dia.id]
                ? "#030979"
                : "var(--black-012, rgba(0, 0, 0, 0.12)",
            }}
            disabled={!isChecked[dia.id]}
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
                    <div className={styles.divPause} key={index}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                          <TimePicker
                            id="start-pause"
                            label="Início da Pausa"
                            onChange={setStartPause}
                            value={startPause}
                          />
                          <TimePicker
                            id="end-pause"
                            label="Fim da Pausa"
                            onChange={setEndPause}
                            value={endPause}
                          />
                        </DemoContainer>
                        <button onClick={() => deletePause(index)}>
                          <img src={Trash} alt="delete" />
                        </button>
                      </LocalizationProvider>
                    </div>
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
        <Button
          color="blue"
          size="large"
          buttonName={"CONTINUAR"}
          onClick={handleClickContinue}
          //estilizar cor e hover
          style={{ backgroundColor: "#030979", color: "white" }}
        />
      </footer>
    </FormUtil>
  );
}

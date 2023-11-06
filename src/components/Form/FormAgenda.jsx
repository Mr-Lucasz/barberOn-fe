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


const diaDaSemana = [
  { id: 1, dia: "Segunda - Feira" },
  { id: 2, dia: "Terça - Feira" },
  { id: 3, dia: "Quarta - Feira" },
  { id: 4, dia: "Quinta - Feira" },
  { id: 5, dia: "Sexta - Feira" },
  { id: 6, dia: "Sábado" },
  { id: 7, dia: "Domingo" },
];

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

export function FormAgenda() {

  const navigate = useNavigate();
  const {id} = useParams();

  const [isChecked, setIsChecked] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: false,
  });

  const statusChip = [
    { id: 1, status: "Disponivel" },
    { id: 2, status: "Indiponível" },
  ];
  const [config, setConfig] = useState({
    "Segunda - Feira": null,
    "Terça - Feira": null,
    "Quarta - Feira": null,
    "Quinta - Feira": null,
    "Sexta - Feira": null,
    "Sábado": null,
    "Domingo": null,
  });


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectDay, setSelectDay] = useState("");
  const [pauses, setPauses] = useState([]);


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
      setPauses(config[dia.dia] || [] );
    }
    }
  
  const handleClickSalvar = () => {
    event.preventDefault();
    setIsModalOpen(false);
    alert("Salvo com sucesso!");
    setConfig({...config, [selectDay]: pauses});

  }


  const handleClickCancelar = () => {
    event.preventDefault();
    console.log("cancelar");
    setIsModalOpen(false);
  };

  const handleClickContinue = () => {
    event.preventDefault();
    navigate(`/register/${id}/step2`);
    console.log("continuar");
  }

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
                  setIsChecked({ ...isChecked, [dia.id]: !isChecked[dia.id] });
                }}
              />
            </ThemeProvider>
            <label className={styles.switchLabel}> {dia.dia}</label>
            {/* usar função statuChip */}

            <Chip
              label={
                isChecked[dia.id] ? statusChip[0].status : statusChip[1].status
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
                        <TimePicker label="Horário de Início" />
                        <TimePicker label="Horárido de Fim" />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <h3 className={styles.h2Modal}>Pausas</h3>
                  {pauses.map((pause, index) => (
                    <div  className={styles.divPause} key={index}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                          <TimePicker label="Início da Pausa" />
                          <TimePicker label="Fim da Pausa" />
                        </DemoContainer>
                        <button onClick={() => deletePause(index)}>
                          <img src={Trash} alt="delete" />
                        </button>
                      </LocalizationProvider>
                    </div>
                  ))}
                  <button className={styles.buttonModalPause} onClick={addPause}>
                    Add Pausa +
                  </button>

                  <div className={styles.btnGroup}>
                    <button className={styles.buttonModalCancel} onClick={handleClickCancelar}>Cancelar</button>
                    <button className={styles.buttonModalSalvar} onClick={handleClickSalvar}>Salvar</button>
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

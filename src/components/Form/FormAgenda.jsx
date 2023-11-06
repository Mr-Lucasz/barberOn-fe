import styles from "./FormAgenda.module.css";
import { FormUtil } from "../util/FormUtil";
import Switch from "@mui/material/Switch";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import { useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import { Button } from "../util/Button";

export function FormAgenda() {
  const diaDaSemana = [
    { id: 1, dia: "Segunda - Feira" },
    { id: 2, dia: "Terça - Feira" },
    { id: 3, dia: "Quarta - Feira" },
    { id: 4, dia: "Quinta - Feira" },
    { id: 5, dia: "Sexta - Feira" },
    { id: 6, dia: "Sábado" },
    { id: 7, dia: "Domingo" },
  ];

  const statusChip = [
    { id: 1, status: "Disponivel" },
    { id: 2, status: "Indiponível" },
  ];

  const [isChecked, setIsChecked] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: false,
  });

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
                onChange={() =>{
                  setIsChecked({ ...isChecked, [dia.id]: !isChecked[dia.id] })
                }}
              />
            </ThemeProvider>
            <label className={styles.switchLabel}> {dia.dia}</label>
            <Chip label={isChecked[dia.id] ? "Disponivel" : "Indisponivel"} 
            color={isChecked[dia.id] ? "success" : "error"}
          style={{backgroundColor: isChecked[dia.id] ? "" : "#9A3648"}}
            />
          </div>
          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            style={{ backgroundColor: "#030979" }}
          >
            <EditIcon />
          </Fab>
        </div>
      ))}
      <footer className={styles.formFooter}>
        <Button
          color="blue"
          size="large"
          buttonName={"CONTINUAR"}
          //estilizar cor e hover
          style={{ backgroundColor: "#030979", color: "white" }}
        />
      </footer>
    </FormUtil>
  );
}

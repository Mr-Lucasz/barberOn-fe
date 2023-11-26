import styles from "./PauseFormAgenda.module.css";
import propTypes from "prop-types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Trash from "../../../assets/Trash.svg";
import dayjs from "dayjs";

export function PauseFormAgenda({
  index,
  pause,
  deletePause,
  onStartPauseChange,
  onEndPauseChange,
}) {
  const handleStartChange = (newStart) => {
    console.log("Start time changed:", newStart); // Log the new start time
    onStartPauseChange(newStart.format("HH:mm:ss"), index);
  };
  
  const handleEndChange = (newEnd) => {
    console.log("End time changed:", newEnd); // Log the new end time
    onEndPauseChange(newEnd.format("HH:mm:ss"), index);
  };

  return (
    <div className={styles.divPause}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Início da Pausa"
            onChange={handleStartChange}
            value={dayjs(pause.pausaHorarioInicio, "HH:mm:ss")}
          />
          <TimePicker
            label="Fim da Pausa"
            onChange={handleEndChange}
            value={dayjs(pause.pausaHorarioFim, "HH:mm:ss")}
          />
        </DemoContainer>
        <button onClick={() => deletePause(index)}>
          <img src={Trash} alt="delete" />
        </button>
      </LocalizationProvider>
    </div>
  );
}

PauseFormAgenda.propTypes = {
  index: propTypes.number.isRequired,
  pause: propTypes.object.isRequired,
  deletePause: propTypes.func.isRequired,
  onStartPauseChange: propTypes.func.isRequired,
  onEndPauseChange: propTypes.func.isRequired,
};

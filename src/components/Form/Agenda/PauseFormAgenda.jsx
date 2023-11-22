import styles from "./PauseFormAgenda.module.css";
import propTypes from "prop-types";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Trash from "../../../assets/Trash.svg";

export function PauseFormAgenda({
  index,
  pause,
  deletePause,
  setStartPause,
  setEndPause,
}) {
  const handleStartChange = (newStart) => {
    setStartPause(newStart, index);
  };

  const handleEndChange = (newEnd) => {
    setEndPause(newEnd, index);
  };

  return (
    <div className={styles.divPause}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["TimePicker"]}>
          <TimePicker
            label="Início da Pausa"
            onChange={handleStartChange}
            value={pause.start}
          />
          <TimePicker
            label="Fim da Pausa"
            onChange={handleEndChange}
            value={pause.end}
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
  setStartPause: propTypes.func.isRequired,
  setEndPause: propTypes.func.isRequired,
};

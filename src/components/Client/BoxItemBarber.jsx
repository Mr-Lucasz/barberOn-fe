import propTypes from "prop-types";
import styles from "./BoxItemBarber.module.css";
import ReactStars from "react-stars";
import defaultPerfil from "../../assets/thumb.svg";
import Chip from "@mui/material/Chip";

export function BoxItemBarber({
  imgClassName,
  stars,
  status,
  name,
  onChooseServiceButtonClick,
}) {
  return (
    <div className={styles.boxItem}>
      <div className={styles.imgContainer}>
        <img className={imgClassName} src={defaultPerfil} alt="barber" />
      </div>
      <div className={styles.infoContainer}>
        <h2>{name}</h2>
        <Chip
          label={status}
          color={status === "Disponível" ? "success" : "error"}
        />
        {/* usar react stars */}
        <ReactStars count={5} value={stars} size={24} color2={"#E77C40"} />

        <button
          className={styles.buttonAgendar}
          onClick={onChooseServiceButtonClick}
        >
          Escolher Serviço
        </button>
      </div>
    </div>
  );
}

BoxItemBarber.propTypes = {
  children: propTypes.node,
  imgClassName: propTypes.string,
  stars: propTypes.string,
  status: propTypes.string,
  name: propTypes.string,
  onChooseServiceButtonClick: propTypes.func,

};
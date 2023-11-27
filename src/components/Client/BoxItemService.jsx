import styles from "./BoxItemService.module.css";
import defaultPerfil from "../../assets/thumb.svg";
import propTypes from "prop-types";

export function BoxItemService({
  imgClassName,
  serviceName,
  servicePrice,
  serviceHour,
  serviceMinutes,
  serviceDescount,
  isSelected,
  onServiceSelect,
  onReserveButtonClick, 
}) {
  return (
    <div className={styles.boxItem}>
      <div className={styles.imgContainer}>
        <img className={imgClassName} src={defaultPerfil} alt="barber" />
      </div>
      <div className={styles.infos}>
        <div className={styles.infoContainerSelect}>
          <input
            type="checkbox"
            checked={isSelected}
            onClick={onServiceSelect}
          />
          <h2>{serviceName}</h2>
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.price}>{"R$" + servicePrice}</span>
        </div>
        <div className={styles.infoDesconto}>
          <span className={styles.descount}>
            {"Desconto " + serviceDescount + "%"}
          </span>
        </div>
        <div className={styles.infoTimeService}>
          <span className={styles.time}>
            {serviceHour + "h" + serviceMinutes + "min"}
          </span>
        </div>
        <button
          className={styles.buttonAgendar}
          onClick={onReserveButtonClick}
        >
          RESERVAR
        </button>
      </div>
    </div>
  );
}

BoxItemService.propTypes = {
  children: propTypes.node,
  imgClassName: propTypes.string,
  stars: propTypes.string,
  status: propTypes.string,
  name: propTypes.string,
  serviceName: propTypes.string,
  servicePrice: propTypes.number,
  serviceHour: propTypes.string,
  serviceMinutes: propTypes.string,
  serviceDescount: propTypes.string,
  isSelected: propTypes.bool.isRequired,
  onServiceSelect: propTypes.func.isRequired,
  onReserveButtonClick: propTypes.func.isRequired,
};

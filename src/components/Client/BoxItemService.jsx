
import styles from './BoxItemService.module.css';
import defaultPerfil from '../../assets/thumb.svg';
import propTypes from "prop-types";

export function BoxItemService({imgClassName}){
return (
    <div className={styles.boxItem}>
      <div className={styles.imgContainer}>
        <img className={imgClassName} src={defaultPerfil} alt="barber" />
      </div>
      <div className={styles.infoContainer}>
        {/* checkbox */}

        <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
        <h2>Nome Barber</h2>
        <div className={styles.infoContainer}>
            <h3>Nome Serviço</h3>
            <span className={styles.price}>R$ 00,00</span>
        </div>


        <button className={styles.buttonAgendar}>Reservar</button>
      </div>
    </div>
  );
}

BoxItemService.propTypes = {
  children: propTypes.node,
  imgClassName: propTypes.string,
  stars: propTypes.string,
  status: propTypes.string,
};
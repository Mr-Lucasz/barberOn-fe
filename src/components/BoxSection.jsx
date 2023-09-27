import styles from "./BoxSection.module.css";
import PropTypes from 'prop-types';


export function BoxSection({ description, img, heading }) {
  return (
    <div className={styles.boxServices}>
      <img className={styles.img} alt="Tesoura" src={img} />
      <h2>{heading}</h2>
      <article className={styles["description-services"]}>
        <p>{description}</p>
      </article>
    </div>
  );
}

BoxSection.propTypes = {
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

import styles from "./TitleTopic.module.css";
import { PropTypes } from "prop-types";
import Line from "../../assets/Line1.svg";

export function TitleTopic({ title, id }) {
  return (
    <>
      <section id={id}>
        <div className={styles.diviserServices}>
          <h1 className={styles.text}>{title}</h1>
          <img className={styles.line} alt="Line" src={Line} />
        </div>
      </section>
    </>
  );
}


TitleTopic.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    };

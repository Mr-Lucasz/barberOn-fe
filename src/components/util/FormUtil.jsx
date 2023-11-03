import styles from "./FormUtil.module.css";
import PropTypes from "prop-types";

export function FormUtil({ children}) {

  //add props 
  return <form className={styles.form}>{children}</form>;
}

FormUtil.propTypes = {
  children: PropTypes.node.isRequired,
};

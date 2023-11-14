import styles from "./WrapperDefault.module.css";
import PropTypes from "prop-types";

export function WrapperDefault({ children }) {
    return <div className={styles.wrapper}>{children}</div>;
    }

WrapperDefault.propTypes = {
    children: PropTypes.node,
    };

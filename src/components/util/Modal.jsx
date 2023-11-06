import styles from "./Modal.module.css";
import PropTypes from "prop-types";

export default function Modal(props) {
  return (
    <>
      {props.isModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <header className={styles.headerModal}>
              <h2>{props.modalTitle}</h2>
              <button onClick={props.closeModal}>X</button>
            </header>
            <span className={styles.subtitleModal}>
              {props.childrenSubtitle}
            </span>

            <div className={styles.contentModal}>{props.contentModal}</div>
            <footer className={styles.footerModal}>
              {props.childrenFooter}
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
Modal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalTitle: PropTypes.string,
  childrenContent: PropTypes.node,
  childrenFooter: PropTypes.node,
  contentModal: PropTypes.node,
  childrenSubtitle: PropTypes.node,
};

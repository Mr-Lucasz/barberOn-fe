import PropTypes from 'prop-types';
import styles from './Button.module.css';

export function Button({ color, buttonName, onClick, id, ...props }) {
  const buttonClasses = `${styles.button} ${styles[color]}`;

  return (
    <button className={buttonClasses} onClick={onClick} id={id} {...props}>
      {buttonName}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['white', 'black', 'red', 'blue', 'save']).isRequired,
  buttonName: PropTypes.string.isRequired,
  onClick: PropTypes.func, 
  id: PropTypes.string,
};
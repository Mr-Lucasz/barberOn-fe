import PropTypes from 'prop-types';
import styles from './Button.module.css';

export function Button({ color, buttonName, ...props }) {

  const buttonClasses = `${styles.button} ${styles[color]}`;

  return (
    <button className={buttonClasses} {...props}>
      {buttonName}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['white', 'black', 'red']).isRequired,
  buttonName: PropTypes.string.isRequired
};

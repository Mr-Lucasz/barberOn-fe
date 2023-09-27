import PropTypes from 'prop-types';
import styles from './Button.module.css';

export function Button({ color, buttonName, ...props }) {
  // Create CSS classes based on the color and size props
  const buttonClasses = `${styles.button} ${styles[color]}`;

  return (
    <button className={buttonClasses} {...props}>
      {buttonName}
    </button>
  );
}

Button.propTypes = {
  color: PropTypes.oneOf(['white', 'black']).isRequired,
  buttonName: PropTypes.string.isRequired
};

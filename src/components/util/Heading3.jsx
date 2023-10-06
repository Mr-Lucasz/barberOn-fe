import PropTypes from "prop-types";
import styles from "./Heading3.module.css";

export function Heading3({ color, fontSize, text }) {
  // Crie uma classe CSS condicional para o tamanho da fonte
  const fontSizeClass = fontSize ? styles[fontSize] : "";

  // Use a classe CSS condicional no elemento h3
  return <h3 className={`${styles.heading3} ${styles[color]} ${fontSizeClass}`}>{text}</h3>;
}

Heading3.propTypes = {
  color: PropTypes.oneOf(["white", "black"]).isRequired,
  fontSize: PropTypes.oneOf(["small", "medium", "large"]), 
  text: PropTypes.string.isRequired,
};

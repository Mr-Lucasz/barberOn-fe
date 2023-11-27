import styles from './Select.module.css';
import propsTypes from 'prop-types';

export function Select({
  value,
  onChange,
  options,
  name,
  id,
  label,
  defaultOptionLabel = 'Selecione',
  ...props
}) {
  return (
    <div className={styles.selectWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <select 
        value={value} 
        onChange={onChange} 
        name={name} 
        id={id} 
        {...props}
      >
        <option value="">{defaultOptionLabel}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Select.propTypes = {
  value: propsTypes.string,
  onChange: propsTypes.func,
  options: propsTypes.arrayOf(
    propsTypes.shape({
      value: propsTypes.string,
      label: propsTypes.string,
    })
  ).isRequired,
  name: propsTypes.string,
  id: propsTypes.string,
  label: propsTypes.string,
  defaultOptionLabel: propsTypes.string,
};
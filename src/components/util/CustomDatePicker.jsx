import { useState } from 'react';
import styles from '../util/CustomDatePicker.module.css';
import propTypes from 'prop-types';

export function CustomDatePicker({ onDateChange }) {
   const today = new Date();
   const future = new Date();
   future.setDate(today.getDate() + 7);

   const todayStr = today.toISOString().substr(0, 10);
   const futureStr = future.toISOString().substr(0, 10);

   const [date, setDate] = useState(todayStr);

   function handleChange(e) {
      setDate(e.target.value);
      onDateChange(e.target.value);
   }

   return (
      <input className={styles.datePicker} type="date" value={date} min={todayStr} max={futureStr} onChange={handleChange} />
   );
}

CustomDatePicker.propTypes = {
   onDateChange: propTypes.func
}
// TableAgendamento.jsx
import propsTypes from "prop-types";
import Pagination from "@mui/material/Pagination";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import styles from "./TableAgendamento.module.css";

export function TableAgendamento({ data, totalItems, onPageChange }) {
  const itemsPerPage = 8;

  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Barbeiro</th>
            <th>Serviço</th>
            <th>Horário</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.barbeiro}</td>
              <td>{item.servico}</td>
              <td>{item.horario}</td>
              <td>{item.valor}</td>
              <td>
                <AiOutlineEdit className={styles.icon} />
                <AiOutlineDelete className={styles.icon} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.paginationContainer}>
      <Pagination count={Math.ceil(totalItems / itemsPerPage)} onChange={handlePageChange} />
    </div>
    </div>
  );
}

TableAgendamento.propTypes = {
  data: propsTypes.arrayOf(
    propsTypes.shape({
      id: propsTypes.number,
      barbeiro: propsTypes.string,
      servico: propsTypes.string,
      horario: propsTypes.string,
      valor: propsTypes.string,
      acoes: propsTypes.string,
    })
  ).isRequired,
  totalItems: propsTypes.number.isRequired,
  onPageChange: propsTypes.func
};

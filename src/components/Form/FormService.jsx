import styles from './FormService.module.css';
import { FormUtil } from '../util/FormUtil.jsx';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export function FormService() {
    return (
      <FormUtil>
        <div className={styles.headerForm}>
        <h1 className={styles.title}>Serviços</h1>
        <span>Informe seu horário de trabalho.</span>
      </div>
      <div className={styles.serviceSection}>
        <span className={styles.serviceTitle}>Serviços</span>
        <span className={styles.serviceTempo}>1h30min</span>
        <span className={styles.serviceValor}>R$ 100,00</span>

        <Fab
            color="primary"
            aria-label="edit"
            size="small"
            style={{
              zIndex: 1,
              backgroundColor: "#030979",
            }}
          >
            <EditIcon />
          </Fab>
          <Fab
            color="primary"
            aria-label="edit"
            size="small"
            style={{
              zIndex: 1,
              backgroundColor: "#9A3648",
            }}
          >
            <CloseIcon />
          </Fab>

      </div>
      <button className={styles.buttonAdd}>Adicionar Serviço</button>
      <footer className={styles.formFooter}>

        <button className={styles.buttonContinuar}>Salvar</button>
      </footer>

      </FormUtil>
    );
}
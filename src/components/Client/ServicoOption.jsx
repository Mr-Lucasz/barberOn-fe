import styles from './ServicoOption.module.css';
import { BoxItemService } from './BoxItemService';


export function ServicoOption() {

    return(
        <div className={styles.wrapperTwo}>
            <button className={styles.buttonAgendar}>Reservar</button>
           <BoxItemService/>
        </div>
    );
}
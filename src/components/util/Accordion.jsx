//accordion com props de header e body

import{ useState } from "react";
import styles from "./Accordion.module.css";
import { PropTypes } from 'prop-types';
export const Accordion = ({ header, body }) => {

    const [open, setOpen] = useState(true);
    
    return (
        <div className={styles.wrapperAccordion}>
        <div className={styles.headerAccordion} onClick={() => setOpen(!open)}>
            <span>{header}</span>
            <span>{open ? "-" : "+"}</span>
        </div>
        {open && <div className={styles.bodyAccordion}>{body}</div>}
        </div>
    );
}

Accordion.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
};

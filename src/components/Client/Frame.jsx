import styles from "./Frame.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { CustomTabPanel } from "./CustomTabPanel.jsx";

import propTypes from "prop-types";

export function Frame({ children }) {
  const [value, setValue] = useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={styles.frame}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Escolha um Barbeiro" {...a11yProps(0)} />
        <Tab label="SERVIÇO" {...a11yProps(1)} />
        <Tab label="AGENDAMENTO" {...a11yProps(2)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        {children}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {children}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {children}
      </CustomTabPanel>

   
    </div>
  );
}

Frame.propTypes = {
  children: propTypes.node.isRequired,
};

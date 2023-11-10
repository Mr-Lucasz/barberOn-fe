import styles from "./FormService.module.css";
import { FormUtil } from "../util/FormUtil.jsx";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "../util/Modal";
import { useState } from "react";
import { Button } from "../util/Button.jsx";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";
import { Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

let serviceList = [];

export function FormService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [serviceMinutes, setServiceMinutes] = useState("");
  const [editingService, setEditingService] = useState(null);
  const navigate = useNavigate();

  const generateHourOptions = () => {
    let options = [];
    for (let i = 0; i < 9; i++) {
      options.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return options;
  };

  const generateMinuteOptions = () => {
    let options = [];
    for (let i = 5; i < 60; i += 5) {
      options.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return options;
  };

  const addService = () => {
    // Lógica para adicionar um novo serviço
    setServices((prevServices) => {
      serviceList = [
        ...prevServices,
        {
          id: uuidv4(),
          name: serviceName,
          value: serviceValue,
          hours: serviceHours,
          minutes: serviceMinutes,
        },
      ];
      return serviceList;
    });
  };

  const editService = () => {
    // Lógica para editar um serviço existente
    setServices((prevServices) => {
      serviceList = prevServices.map((service) =>
        service.id === editingService.id
          ? {
              ...service,
              name: serviceName,
              value: serviceValue,
              hours: serviceHours,
              minutes: serviceMinutes,
            }
          : service
      );
      return serviceList;
    });
  };

  const handleClickSave = (event) => {
    event.preventDefault();
    if (editingService === null) {
      addService();
      console.log(serviceList);
    } else {
      editService();
      console.log(serviceList);
    }
    setIsModalOpen(false);
  };

  const handleClickModal = (service, event) => {
    event.preventDefault();
    if (service) {
      setEditingService(service);
      setServiceName(service.name);
      setServiceValue(service.value);
      setServiceHours(service.hours);
      setServiceMinutes(service.minutes);
    } else {
      handleClickLimpar(event);
    }
    setIsModalOpen(true);
  };

  const handleClickLimpar = () => {
    event.preventDefault();
    setServiceName("");
    setServiceValue("");
    setServiceHours("");
    setServiceMinutes("");
  };

  const handleCloseModal = () => {
    setEditingService(null);
    setIsModalOpen(false);
  };
  const handleContinue = (event) => {
    event.preventDefault();
    if (editingService) {
      editService();
    }
    navigate("/home");
  };
  
  const handleRemoveService = (serviceToRemove) => {
    event.preventDefault();
    serviceList = serviceList.filter(
      (service) => service.id !== serviceToRemove.id
    );
    setServices(serviceList);
    console.log(serviceList);
  };

  return (
    <FormUtil>
      <div className={styles.headerForm}>
        <h1 className={styles.title}> &#60; Serviços</h1>
        <span>Informe seu horário de trabalho.</span>
      </div>
      {services.length > 0 ? (
        services.map((service, index) => (
          <div className={styles.serviceSection} key={index}>
            <span className={styles.serviceTitle}>{service.name}</span>
            <span className={styles.serviceTempo}>
              {service.hours}h{service.minutes}min
            </span>
            <span className={styles.serviceValor}>R$ {service.value}</span>
            <div className={styles.icons}>
              <Fab
                color="primary"
                aria-label="edit"
                size="small"
                onClick={(event) => handleClickModal(service, event)}
                style={{
                  zIndex: 1,
                  backgroundColor: "#030979",
                }}
              >
                <EditIcon />
              </Fab>
              <CloseIcon
                fontSize="large"
                onClick={() => handleRemoveService(service)}
                style={{
                  zIndex: 1,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className={styles.serviceTitle}>Nenhum serviço adicionado.</p>
      )}
      <button
        className={styles.buttonAdd}
        onClick={(event) => handleClickModal(null, event)}
      >
        <a>+</a>
        Add Serviço
      </button>
      <footer className={styles.formFooter}>
        <Button color="save" buttonName="CONTINUAR"  onClick={handleContinue} />
      </footer>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={() => handleCloseModal()}
          modalTitle={"Add Serviço"}
          childrenSubtitle={"Defina seu horário comercial aqui."}
          contentModal={
            <>
              <h3 className={styles.h2Modal}>Informações de Serviço</h3>
              <div className={styles.inputGroup}>
                {/* input de Nome e Input de Valor */}
                <TextField
                  id="nameInput"
                  label="Nome do Serviço"
                  variant="outlined"
                  fullWidth
                  multiline
                  inputMode="text"
                  value={editingService ? editingService.name : serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />

                <TextField
                  id="valueInput"
                  label="Valor do Serviço R$"
                  variant="outlined"
                  multiline
                  fullWidth
                  InputProps={{
                    inputComponent: NumericFormat,
                    inputProps: {
                      thousandSeparator: true,
                      prefix: "R$",
                      decimalSeparator: ".",
                      decimalScale: 2,
                      fixedDecimalScale: true,
                      value: editingService
                        ? editingService.value
                        : serviceValue,
                      onValueChange: (values) => setServiceValue(values.value),
                    },
                  }}
                />
              </div>
              <h3 className={styles.h2Modal}>Tempo de Serviço</h3>
              <div className={styles.inputGroup}>
                {/* input de Horas e Input de Minutos */}
                <Select
                  fullWidth
                  value={editingService ? editingService.hours : serviceHours}
                  onChange={(e) => setServiceHours(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Horas
                  </MenuItem>
                  {generateHourOptions()}
                </Select>

                <Select
                  fullWidth
                  value={
                    editingService ? editingService.minutes : serviceMinutes
                  }
                  onChange={(e) => setServiceMinutes(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Minutos
                  </MenuItem>
                  {generateMinuteOptions()}
                </Select>
              </div>
              <div className={styles.btnGroup}>
                <button
                  className={styles.buttonModalCancel}
                  onClick={handleClickLimpar}
                >
                  Limpar
                </button>
                <button
                  className={styles.buttonModalSalvar}
                  onClick={handleClickSave}
                >
                  Salvar
                </button>
              </div>
            </>
          }
        />
      )}
    </FormUtil>
  );
}

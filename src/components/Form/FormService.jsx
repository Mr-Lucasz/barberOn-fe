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
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";

let serviceList = [];

export function FormService() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceValue, setServiceValue] = useState("");
  const [serviceHours, setServiceHours] = useState("");
  const [serviceMinutes, setServiceMinutes] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { id } = useParams();

  const generateHourOptions = () => {
    let options = [];
    for (let i = 0; i < 9; i++) {
      options.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return options;
  };

  const generateMinuteOptions = () => {
    let options = [];
    for (let i = 0; i < 60; i += 5) {
      options.push(<MenuItem value={i}>{i}</MenuItem>);
    }
    return options;
  };

  const postService = async (service) => {
    try {
      // Adicione o serviço à lista de serviços
      serviceList.push(service);
      const response = await axios.post(
        `http://localhost:8080/api/servicos/${id}`,
        serviceList
      );
      return response.data;
    } catch (error) {
      console.error("Error posting service:", error);
    }
  };

  const patchService = async (service) => {
    try {
      // Edite o serviço na lista de serviços
      const response = await axios.patch(
        `http://localhost:8080/api/servicos/${id}/${service.id}`,
        serviceList
      );
      return response.data;
    } catch (error) {
      console.error("Error patching service:", error);
    }
  };

  const removeService = async (servicoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/servicos/${servicoId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/servicos/${id}`
      );
      if (response.status === 404) {
        setError(true);
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error getting services:", error);
      setError(true);
      return [];
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      const servicesFromServer = await getServices();
      setServices(servicesFromServer);
    };

    fetchServices();
  }, []);

  const addService = async () => {
    const newService = {
      servicoTitulo: serviceName,
      servicoDescricao: serviceName,
      servicoValor: parseFloat(serviceValue),
      servicoTempoHora: parseInt(serviceHours),
      servicoTempoMinuto: parseInt(serviceMinutes),
    };
    const postedService = await postService(newService);
    setServices((prevServices) => [...prevServices, postedService]);
    serviceList = [...services];
  };

  const editService = () => {
    // Lógica para editar um serviço existente
    setServices((prevServices) => {
      serviceList = prevServices.map((service) =>
        service.id === editingService.id
          ? {
              ...service,
              servicoTitulo: serviceName,
              servicoValor: serviceValue,
              servicoTempoHora: serviceHours,
              servicoTempoMinuto: serviceMinutes,
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
    } else {
      editService();
    }
    setIsModalOpen(false);
  };

  const handleClickModal = (service, event) => {
    event.preventDefault();
    if (service) {
      setEditingService(service);
      setServiceName(service.servicoTitulo);
      setServiceValue(service.servicoValor);
      setServiceHours(service.servicoTempoHora);
      setServiceMinutes(service.servicoTempoMinuto);
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
    setUser({ ...user, services: serviceList });
    navigate("/home");
  };
  useEffect(() => {
    serviceList = [...services];
  }, [services]);

  const handleRemoveService = async (serviceToRemove) => {
    // Remova o serviço da lista de serviços imediatamente
    setServices((prevServices) =>
      prevServices.filter(
        (service) => service.servicoId !== serviceToRemove.servicoId
      )
    );

    try {
      // Tente remover o serviço usando a API
      await removeService(serviceToRemove.servicoId);
    } catch (error) {
      console.error("Error deleting service:", error);
      // Se a chamada para a API falhar, adicione o serviço de volta à lista
      setServices((prevServices) => [...prevServices, serviceToRemove]);
    }
  };

  return (
    <FormUtil>
      <div className={styles.headerForm}>
        <h1 className={styles.title}> &#60; Serviços</h1>
        <span>Informe seu horário de trabalho.</span>
      </div>
      {!error && services.length > 0 ? (
        services.map((service, index) => (
          <div className={styles.serviceSection} key={service.id}>
            <span className={styles.serviceTitle}>{service.servicoTitulo}</span>
            <span className={styles.serviceTempo}>
              {service.servicoTempoHora}h{service.servicoTempoMinuto}min
            </span>
            <span className={styles.serviceValor}>
              R$ {service.servicoValor}
            </span>
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
        <Button color="save" buttonName="CONTINUAR" onClick={handleContinue} />
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
                  value={serviceName}
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
                      value: serviceValue,
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
                  value={serviceHours}
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
                  value={serviceMinutes}
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

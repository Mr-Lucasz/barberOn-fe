import styles from "./NotificationDrop.module.css";
import { Avatar } from "@mui/material";
import { Button } from "./util/Button.jsx";
import { useState } from "react";

const serviceList = [
  {
    avatar: Avatar,
    idUser: "1",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
  {
    avatar: Avatar,
    idUser: "2",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
  {
    avatar: Avatar,
    idUser: "3",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
  {
    avatar: Avatar,
    idUser: "4",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
  {
    avatar: Avatar,
    idUser: "5",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
  {
    avatar: Avatar,
    idUser: "6",
    clienteName: "João da Silva",
    name: "Corte de cabelo",
    value: "50,00",
    hours: "1",
    minutes: "30",
  },
];

export function NotificationDrop() {
  const [service, setService] = useState(serviceList);

  const handleButtonClick = (index) => {
    const newService = [...service];
    newService.splice(index, 1);
    setService(newService);
  };

  return (
    <div className={styles.dropdownNotification}>
      <h1>Notificações</h1>
      {service.length > 0 ? (
        service.map((item, index) => (
          <div key={index} className={styles["section-notification"]}>
            <div className={styles["notification-container"]}>
              <img src={item.avatar} />
              <div className={styles["sub-container"]}>
                <span className={styles.clienteName}>{item.clienteName}</span>
                <span className={styles.serviceTitle}>{item.name}</span>
              </div>
              <span className={styles.serviceTempo}>
                {item.hours}h{item.minutes}min
              </span>
              <span className={styles.serviceValor}>R$ {item.value}</span>
            </div>
            <div className={styles["button-container"]}>
              <Button
                color="blue"
                size="large"
                buttonName="ACEITAR"
                onClick={() => handleButtonClick(index)}
              />
              <Button
                color="blue"
                size="large"
                buttonName="RECUSAR"
                onClick={() => handleButtonClick(index)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Não há serviços na lista de notificações.</p>
      )}
    </div>
  );
}

import styles from "./ThirdSection.module.css";
import { TitleTopic } from "../../../components/util/TitleTopic";
import { Heading3 } from "../../../components/util/Heading3";
import TextField from "@mui/material/TextField";
import { Button } from "../../../components/util/Button";
import { styled } from "@mui/material/styles";
import { Navigate } from "react-router-dom";

export default function ThirdSection() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": { color: "white" },
    "& label": { color: "white" },
    "& .MuiInput-underline:after": { borderBottomColor: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "White" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
      "& input": { color: "white" },
      "& textarea": { color: "white" },
    },
  });

  // Logic for sending WhatsApp message
  const sendForm = (event) => {
    event.preventDefault();
    try {
      // const nameInput = document.getElementById("nameInput").value;
      const numberInput = document.getElementById("numberInput").value;
      const message = document.getElementById("messageInput").value;

      const whatsappLink = `https://api.whatsapp.com/send?phone=${numberInput}&text=${encodeURIComponent(
        message
      )}`;
      Navigate(whatsappLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TitleTopic title="Contato" id="contacts" />
      <div className={styles.wrapperContacts}>
        <form className={styles.formContatos}>
          <Heading3
            color="white"
            fontSize="large"
            text="Informações pessoais:"
          />
          <CssTextField
            id="nameInput"
            label="Informe seu Nome"
            variant="outlined"
            fullWidth
          />
          <CssTextField
            id="numberInput"
            label="Informe seu Número"
            variant="outlined"
            inputMode="numeric"
            fullWidth
          />
          <Heading3
            color="white"
            fontSize="large"
            text="Assunto de Interesse"
          />
          <CssTextField
            id="messageInput"
            label="Informe sua mensagem"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <div className={styles.btn}>
            <Button color="red" buttonName="ENVIAR" onClick={sendForm} />
          </div>
        </form>
        <div className={styles.infoContatos}>
          <Heading3 color="white" fontSize="large" text="Endereço:" />
          <Heading3
            color="white"
            fontSize="small"
            text="Rua 13 Norte, Lote 04 – Ed. Ilha de Manhattan – Águas Claras, Brasília – DF."
          />
          <Heading3 color="white" fontSize="large" text="Horário:" />
          <Heading3
            color="white"
            fontSize="small"
            text="Segunda a sexta: 09h às 20h - Sábado: 9h às 19h"
          />
          <Heading3 color="white" fontSize="large" text="Telefone:" />
          <Heading3 color="white" fontSize="small" text="+55 (94) 98118-3574" />
        </div>
      </div>
    </>
  );
}

import styles from "./ThirdSection.module.css";
import { TitleTopic } from "../../../components/util/TitleTopic";
import { Heading3 } from "../../../components/util/Heading3";
import TextField from "@mui/material/TextField";
import { Button } from "../../../components/util/Button";
import { styled } from "@mui/material/styles";
import InputMask from "react-input-mask";
import { Accordion } from "../../../components/util/Accordion";

export default function ThirdSection() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": { color: "white" },
    "& label": { color: "white" },
    "& .MuiInput-underline:after": { borderBottomColor: "white" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "White" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "white" },
      "& input": { color: "white", width: "90%" },
      "& textarea": { color: "white" },
    },
  });

  // Logic for sending WhatsApp message
  const sendForm = (event) => {
    event.preventDefault();

    try {
      const nameInput = document.getElementById("nameInput").value;
      const numberInput = document.getElementById("numberInput").value;
      const messageInput = document.getElementById("messageInput").value;

      const name = `Olá, Sou ${nameInput}`;
      const message = `${name}\n${messageInput}`;

      const whatsappLink = `https://api.whatsapp.com/send?phone=${numberInput}&text=${encodeURIComponent(
        message
      )}`;

      // Open  new tab or window
      window.open(whatsappLink, "_blank");

      // Clear the input
      document.getElementById("nameInput").value = "";
      document.getElementById("numberInput").value = "";
      document.getElementById("messageInput").value = "";
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
          <InputMask
            mask="+55 (99) 99999-9999"
            maskChar=" "
            alwaysShowMask={true}
          >
            {() => (
              <CssTextField
                id="numberInput"
                label="Informe seu Número"
                variant="outlined"
                inputMode="numeric"
                fullWidth
              />
            )}
          </InputMask>
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
   
          <Accordion
            header={<Heading3 color="white" fontSize="large" text="Endereço:" />}
            body={
              <span className={styles.endereco}>
                Rua 13 Norte, Lote 04 – Ed. Ilha de Manhattan – Águas Claras,
                Brasília – DF.
              </span>
            }
          />

          <Accordion
            header={<Heading3 color="white" fontSize="large" text="Horário:" />}
            body={
              <span className={styles.horario}>
                Segunda a sexta: 09h às 20h - Sábado: 9h às 19h
              </span>
            }
          />

          <Accordion
            header={<Heading3 color="white" fontSize="large" text="Telefone:" />}
            body={
              <span className={styles.telefone}> 📞 +55 (94) 98118-3574</span>
            }
          />
        </div>
      </div>
    </>
  );
}

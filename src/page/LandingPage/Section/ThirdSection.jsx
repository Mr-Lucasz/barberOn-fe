import styles from "./ThirdSection.module.css";
import { TitleTopic } from "../../../components/util/TitleTopic";
import { Heading3 } from "../../../components/util/Heading3";
import TextField from "@mui/material/TextField";
import { Button } from "../../../components/util/Button";
import { styled } from "@mui/material/styles";

export default function ThirdSection() {
  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "White",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      "& label.Mui-focused": {
        color: "white",
    },
    },
  });
  return (
    <>
      <TitleTopic title="Contato" id="contacts" />
      <form className={styles.formContatos}>
        <Heading3 color="white" fontSize="large" text="Informações pessoais:" />
        <CssTextField
          id="outlined-basic"
          label="Informe seu Nome"
          variant="outlined"
          fullWidth
          
        />
        <CssTextField
          id="outlined-basic"
          label="Informe seu Número"
          variant="outlined"
          fullWidth
        />
        <Heading3 color="white" fontSize="large" text="Assunto de Interesse" />
        <CssTextField
          id="outlined-basic"
          label="Informe sua mensagem"
          variant="outlined"
          fullWidth
        />
        <Button color="red" buttonName="ENVIAR" />
      </form>
    </>
  );
}

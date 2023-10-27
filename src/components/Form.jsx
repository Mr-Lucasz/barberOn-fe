import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "./util/Button.jsx";

export function Form() {


  return (
    <form className={styles.form}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Login</h1>
        <span className={styles.formSubtitle}>
          Please enter your credentials to proceed
        </span>
        <p>Login Here</p>
      </header>
      <section className={styles.formSection}>
        <TextField
          id="outlined-basic"
          label="Informe seu Email"
          variant="outlined"
          required={true}
          type="email"
          fullWidth
        />
        <TextField
          id="outlined-basic"
          label="Informe sua Senha"
          variant="outlined"
          required={true}
          type="password"
          endAdornment={
            <InputAdornment position="end"></InputAdornment>
            //icone de toggle password - fa fa-eye ou fa fa-eye-slash - inicia code abaixo:
          }
        />

        <span>Forgot Password ?</span>
      </section>
      <footer className={styles.formFooter}>
        <Button color="blue" size="large" buttonName="ENTRAR"/>
      </footer>
    </form>
  );
}

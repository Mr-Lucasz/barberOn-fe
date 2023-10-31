import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "./util/Button.jsx";

export function Form() {
  const handleClick = function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("outlined-email").value;
      const senha = document.getElementById("outlined-password").value;
      console.log(email);
      console.log(senha);
      //regex validação email
      const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
      if (email === "" || senha === "" || senha === undefined || email === undefined) {
        alert("Preencha todos os campos");
        return;
      } else if (!regexEmail.test(email)) {
        alert("Email inválido");
        return;
      }
      alert("Login realizado com sucesso");
    } catch (error) {
      console.log(error);

      alert("Erro ao realizar login");
    }
  };

  return (
    <form className={styles.form}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Login</h1>
        <span className={styles.formSubtitle}>
          Please enter your credentials to proceed
          <p>
            Voce pode se cadastrar{" "}
            <a className={styles.here} href="/">
              clicando aqui !
            </a>
          </p>
        </span>
      </header>
      <section className={styles.formSection}>
        <TextField
          id="outlined-email"
          label="Informe seu Email"
          variant="outlined"
          required={true}
          type="email"
          fullWidth
        />
        <TextField
          id="outlined-password"
          label="Informe sua Senha"
          variant="outlined"
          required={true}
          type="password"
        />

        <span>Forgot Password ?</span>
      </section>
      <footer className={styles.formFooter}>
        <Button color="blue" size="large" buttonName="ENTRAR" onClick={handleClick} />
      </footer>
    </form>
  );
}
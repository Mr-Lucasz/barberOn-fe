import styles from "./Form.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "./util/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";

export function Form({ formType, showForgotPassword }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [cpf, setCpf] = useState("");
  const [number, setNumber] = useState("");

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (email, password) => {
    const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (
      email === "" ||
      password === "" ||
      password === undefined ||
      email === undefined
    ) {
      alert("Preencha todos os campos");
      return false;
    } else if (!regexEmail.test(email)) {
      alert("Email inválido");
      return false;
    }
    return true;
  };

  const handleClick = function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("outlined-email").value;
      const password = document.getElementById("outlined-password").value;
      console.log(email);
      console.log(password);

      if (!validateForm(email, password)) {
        return;
      }

      if (formType === "login") {
        alert("Login realizado com sucesso");
        navigate("/home");
      } else if (formType === "") {
        // Add your registration logic here
        alert("Registration successful");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar login");
    }
  };

  return (
    <form className={styles.form}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>
          {formType === "login" ? "Login no Sistema" : "Cadastro no Sistema"}
        </h1>
        {formType === "login" && (
          <span className={styles.formSubtitle}>
            Por favor, informe seus dados para{" "}
            {formType === "login" ? "acessar" : "criar"} uma conta
            <p>
              Você pode se cadastrar{" "}
              <a className={styles.here} href="/register">
                clicando aqui!
              </a>
            </p>
          </span>
        )}
        {formType === "" && (
          <span className={styles.formSubtitle}>
            Por favor, informe seus dados para{" "}
            {formType === "" ? "acessar" : "criar"} uma conta
            <p>
              Você pode logar {" "}
              <a className={styles.here} href="/login">
                aqui!
              </a>
            </p>
          </span>
        )}
      </header>
      <section className={styles.formSection}>
        <h2>{formType === "login" ? "Login" : "Cadastro"}</h2>
        {/* campo name só vai aparecer para cadastro */}
        {formType === "" && (
          <>
            <TextField
              id="outlined-name"
              label="Informe seu Nome"
              variant="outlined"
              required={true}
              type="text"
              fullWidth
            />
            <TextField
              id="outlined-dob"
              label="Data de Nascimento"
              variant="outlined"
              required={true}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <InputMask
              mask="999.999.999-99"
              value={cpf}
              onChange={handleCpfChange}
            >
              {(inputProps) => (
                <TextField {...inputProps} type="text" label="CPF" fullWidth />
              )}
            </InputMask>
            <InputMask
              mask="(99) 99999-9999"
              value={number}
              onChange={handleNumberChange}
            >
              {(inputProps) => (
                <TextField
                  {...inputProps}
                  type="text"
                  label="Telefone"
                  fullWidth
                />
              )}
            </InputMask>
          </>
        )}
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
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {showForgotPassword && (
          <span className={styles.spanForgot}>Forgot Password ?</span>
        )}
      </section>
      <footer className={styles.formFooter}>
        <Button
          color="blue"
          size="large"
          buttonName={formType === "login" ? "ENTRAR" : "CADASTRAR"}
          onClick={handleClick}
        />

        {(formType === "login" || formType === "") && (
          <div className={styles.userType}>
            <input type="checkbox" className={styles.userTypeCheckbox} />
            <label className={styles.userTypeLabel} htmlFor="userType">
              Funcionário BarberOn
            </label>
          </div>
        )}
      </footer>
    </form>
  );
}

Form.propTypes = {
  formType: PropTypes.oneOf(["login", "registration"]),
  showForgotPassword: PropTypes.bool,
};

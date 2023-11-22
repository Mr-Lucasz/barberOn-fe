import styles from "./FormLogin.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "../util/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import { FormUtil } from "../util/FormUtil.jsx";

export function FormLogin({ showForgotPassword }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const [isBarberOnEmployee, setIsBarberOnEmployee] = useState(false);


  const handleUserTypeChange = (event) => {
    // setIsBarberOnEmployee(event.target.checked);
    console.log(event.target.checked);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRedirectRegister = () => {
    navigate("/register");
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

  const handleClickLogin = function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("outlined-email").value;
      const password = document.getElementById("outlined-password").value;
      const isBarberOnEmployee = document.getElementById("userType").checked;
      console.log(email);
      console.log(password);

      if (!validateForm(email, password)) {
        return;
      }

      let user = {
        email: email,
        password: password,
        isBarberOnEmployee: isBarberOnEmployee,
      };

      // Add your login logic here
      console.log(user);
      alert("Login realizado com sucesso");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar login");
    }
  };

  return (
    <FormUtil>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Login no Sistema</h1>

        <span className={styles.formSubtitle}>
          Por favor, informe seus dados para acessar uma conta
          <p>
            Você pode se cadastrar{" "}
            <a className={styles.here} onClick={handleRedirectRegister}>
              clicando aqui!
            </a>
          </p>
        </span>

        <div className={styles.userType}>

          <input
            onChange={handleUserTypeChange}
            type="checkbox"
            className={styles.userTypeCheckbox}
          />
          <label className={styles.userTypeLabel} htmlFor="userType">
            Funcionário BarberOn
          </label>
        </div>
      </header>
      <section className={styles.formSection}>
        <h2>Login</h2>
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
          <span className={styles.spanForgot}>
            <a href="/forgot-password">Forgot Password ?</a>
          </span>
        )}
      </section>
      <footer className={styles.formFooter}>
        <Button
          color="blue"
          size="large"
          buttonName={"ENTRAR"}
          onClick={handleClickLogin}
        />
      </footer>
    </FormUtil>
  );
}

FormLogin.propTypes = {
  showForgotPassword: PropTypes.bool,
};

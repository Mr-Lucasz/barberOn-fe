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
  const [isBarberOnEmployee, setIsBarberOnEmployee] = useState(false);

  const handleUserTypeChange = (event) => {
    setIsBarberOnEmployee(event.target.checked);
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

  const handleClickLogin = async (event) => {
    event.preventDefault();

    try {
      const email = document.getElementById("outlined-email").value;
      const password = document.getElementById("outlined-password").value;
      const userType = isBarberOnEmployee ? "BARBEIRO" : "CLIENTE";

      if (!validateForm(email, password)) {
        return;
      }

      let user = {
        email: email,
        password: password,
        userType: userType,
      };

      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar login");
      }

      const data = await response.json();

      // Armazene os dados do usuário no storage do navegador
      localStorage.setItem("user", JSON.stringify(data));

      if (userType === "BARBEIRO") {
        navigate("/home");
      } else {
        navigate("/inicial-page");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
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
            onChange={(event) => handleUserTypeChange(event)}
            type="checkbox"
            className={styles.userTypeCheckbox}
            id="userType"
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

import styles from "./FormRegister.module.css";
import TextField from "@mui/material/TextField";
import { Button } from "../util/Button.jsx";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PropTypes from "prop-types";
import InputMask from "react-input-mask";
import FileAdd from "../../assets/FileAdd.svg";
import { FormUtil } from "../util/FormUtil.jsx";
import { useNavigate } from "react-router-dom";

export function FormRegister({ showForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [cpf, setCpf] = useState("");
  const [number, setNumber] = useState("");
  const [isBarberOnEmployee, setIsBarberOnEmployee] = useState(false);
  const navigate = useNavigate();

  // Adicione uma função para lidar com a mudança do checkbox
  const handleUserTypeChange = (event) => {
    setIsBarberOnEmployee(event.target.checked);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleUpload = () => {
    //depois de clicar e selecionar
    const fileInput = document.getElementById("barberOnEmployeeFile");
    fileInput.click();
  };

  const validateForm = (
    email,
    password,
    name,
    cpf,
    phone,
    dateOfBirth,
    isBarberOnEmployee,
    barberOnEmployeeFile
  ) => {
    const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
    if (
      email === "" ||
      password === "" ||
      password === undefined ||
      email === undefined ||
      name === "" ||
      name === undefined ||
      cpf === "" ||
      cpf === undefined ||
      phone === "" ||
      phone === undefined ||
      dateOfBirth === "" ||
      dateOfBirth === undefined ||
      isBarberOnEmployee === undefined ||
      (isBarberOnEmployee &&
        (barberOnEmployeeFile === "" || barberOnEmployeeFile === undefined))
    ) {
      alert("Preencha todos os campos");
      return false;
    } else if (!regexEmail.test(email)) {
      alert("Email inválido");
      return false;
    }
    return true;
  };

  const handleClickRegister = function (event) {
    event.preventDefault();
    try {
      const email = document.getElementById("outlined-email").value;
      const password = document.getElementById("outlined-password").value;
      const name = document.getElementById("outlined-name").value;
      const cpf = document.getElementById("outlined-cpf").value;
      const phone = document.getElementById("outlined-phone").value;
      const dateOfBirth = document.getElementById("outlined-dob").value;
      const userTypeElement = document.getElementById("userType");
      const isBarberOnEmployee = userTypeElement
        ? userTypeElement.checked
        : false;
      const barberOnEmployeeFileElement = document.getElementById(
        "barberOnEmployeeFile"
      );
      const barberOnEmployeeFile = barberOnEmployeeFileElement
        ? barberOnEmployeeFileElement.value
        : null;

      if (
        !validateForm(
          email,
          password,
          name,
          cpf,
          phone,
          dateOfBirth,
          isBarberOnEmployee,
          barberOnEmployeeFile
        )
      ) {
        return;
      }

      let user = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        password: password,
        name: name,
        cpf: cpf,
        phone: phone,
        dateOfBirth: dateOfBirth,
        isBarberOnEmployee: isBarberOnEmployee,
        barberOnEmployeeFile: barberOnEmployeeFile,
      };

      console.log(user);
      alert("Cadastro Finalizado com sucesso!");
      navigate(`/register/${user.id}/step1`);
    } catch (error) {
      console.log(error);
      alert("Erro ao realizar cadastro");
    }
  };

  return (
    <FormUtil>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Cadastro no Sistema</h1>

        <span className={styles.formSubtitle}>
          Por favor, informe seus dados para criar uma conta
          <p>
            Você pode logar{" "}
            <a className={styles.here} href="/login">
              clicando aqui!
            </a>
          </p>
        </span>

        <div className={styles.userType}>
          <input
            id="userType"
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
        <h2>Cadastro</h2>
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
            id="outlined-cpf"
            mask="999.999.999-99"
            value={cpf}
            onChange={handleCpfChange}
          >
            {(inputProps) => (
              <TextField {...inputProps} type="text" label="CPF" fullWidth />
            )}
          </InputMask>
          <InputMask
            id="outlined-phone"
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

        {isBarberOnEmployee && (
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              id="barberOnEmployeeFile"
              className={styles.inputFile}
              name="barberOnEmployeeFile"
            />
            <button
              type="button"
              className={styles.buttonUpload}
              onClick={handleUpload}
            >
              Faça upload da sua Foto de Perfil
              <img src={FileAdd} alt="Faça upload da sua Foto de Perfil" />
            </button>
          </div>
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
          <span className={styles.spanForgot}>
            <a href="/forgot-password">Forgot Password ?</a>
          </span>
        )}
      </section>
      <footer className={styles.formFooter}>
        <Button
          color="blue"
          size="large"
          buttonName={"CADASTRAR"}
          onClick={handleClickRegister}
        />
      </footer>
    </FormUtil>
  );
}

FormRegister.propTypes = {
  formType: PropTypes.oneOf(["login", "registration"]),
  showForgotPassword: PropTypes.bool,
};

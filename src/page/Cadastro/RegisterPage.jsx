// import styles from "./RegisterPage.module.css";
import { Header } from "../../components/Header.jsx";
import { FormRegister } from "../../components/Form/FormRegister.jsx";
import { FormAgenda } from "../../components/Form/FormAgenda.jsx";
import { useParams } from "react-router-dom";
import { FormService } from "../../components/Form/FormService.jsx";
import { WrapperDefault } from "../../components/util/WrapperDefault.jsx";

export function RegisterPage() {
  const { step } = useParams();
  return (
   <WrapperDefault>
      <Header showButton={false} showNavbar={false} />
      {step === "step1" ? (
        <FormAgenda />
      ) : step === "step2" ? (
        <FormService />
      ) : (
        <FormRegister FormRegister showForgotPassword={false} />
      )}
  </WrapperDefault>
  );
}

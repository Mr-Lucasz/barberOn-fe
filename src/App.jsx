import { LandingPage } from "./page/LandingPage/LandingPage.jsx";
import { HomePage } from "./page/Home/HomePage.jsx";
import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./page/Login/LoginPage.jsx";
import { RegisterPage } from "./page/Cadastro/RegisterPage.jsx";
import { FormAgenda } from "./components/Form/FormAgenda.jsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route exact path="/register" element={<RegisterPage />} />
      <Route path="/register/step1/:id" element={<FormAgenda />} />
    </Routes>
  );
}

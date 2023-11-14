import { LandingPage } from "./page/LandingPage/LandingPage.jsx";
import { HomePageBarber } from "./page/Home/HomePageBarber.jsx";
import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./page/Login/LoginPage.jsx";
import { RegisterPage } from "./page/Cadastro/RegisterPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { BarberAgendaPage } from "./page/BarberPage/Agenda/BarberAgendaPage.jsx";
import { BarberServicePage } from "./page/BarberPage/Serviços/BarberServicePage.jsx";
import { PerfilBarberPage } from "./page/BarberPage/Perfil/PerfilBarberPage.jsx";

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePageBarber />} />
        <Route path="/home/agenda" element={<BarberAgendaPage />} />
        <Route path="/home/service" element={<BarberServicePage />} />
        <Route path="/home/perfil" element={<PerfilBarberPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/register/:id/:step" element={<RegisterPage />} />
      </Routes>
    </UserProvider>
  );
}
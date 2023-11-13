import { LandingPage } from "./page/LandingPage/LandingPage.jsx";
import { HomePageBarber } from "./page/Home/HomePageBarber.jsx";
import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./page/Login/LoginPage.jsx";
import { RegisterPage } from "./page/Cadastro/RegisterPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";

export function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePageBarber />} />
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/register/:id/:step" element={<RegisterPage />} />
      </Routes>
    </UserProvider>
  );
}
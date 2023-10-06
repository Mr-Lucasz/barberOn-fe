import { LandingPage } from "./page/LandingPage/LandingPage.jsx";
import { HomePage } from "./page/Home/HomePage.jsx";
import "./App.module.css";
import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

import {LandingPage} from './page/LandingPage/LandingPage.jsx';
import './App.module.css';
import { Routes, Route } from 'react-router-dom';

export function App () {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
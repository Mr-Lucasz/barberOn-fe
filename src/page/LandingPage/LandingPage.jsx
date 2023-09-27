import styles from "./LandingPage.module.css";
import { Header } from '../../components/Header.jsx';
import { FirstSection } from './Section/FIrstSection.jsx';

export function LandingPage () {
  return (
    <div className={styles.landingWrapper}>
      <Header />
      <FirstSection/>


    </div>
  );
}
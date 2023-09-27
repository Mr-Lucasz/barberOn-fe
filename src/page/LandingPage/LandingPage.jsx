import styles from "./LandingPage.module.css";
import { Header } from "../../components/Header.jsx";
import { FirstSection } from "./Section/FIrstSection.jsx";
import { SecondSection } from "./Section/SecondSection.jsx";
import ThirdSection from "./Section/ThirdSection";

export function LandingPage() {
  return (
    <div className={styles.landingWrapper}>
      <Header />
      <FirstSection />
      <SecondSection />
      <ThirdSection/>
    </div>
  );
}

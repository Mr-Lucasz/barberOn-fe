import styles from "./FirstSection.module.css";
import bannerBarberOn from "../../../assets/Banner.svg"
import imgSection1 from "../../../assets/imgSection1.svg";

export function FirstSection() {
  return (
    <section id="home" className={styles.home}>
      <img
        className={styles.bannerBarberOn}
        src={bannerBarberOn}
        alt="banner da barbearia"
      />

      <div className={styles.imageContainer}>
        <img
          src={imgSection1}
          alt="Imagem 1"
          className={styles.carouselImage}
        />
        {/* <img
          src={imgSection1}
          alt="Imagem 2"
          className={styles.carouselImage}
        />
        <img
          src={imgSection1}
          alt="Imagem 3"
          className={styles.carouselImage}
        />
        <img
          src={imgSection1}
          alt="Imagem 3"
          className={styles.carouselImage}
        /> */}
      </div>

    </section>
  );
}

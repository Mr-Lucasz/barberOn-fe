import styles from "./FirstSection.module.css";
import bannerBarberOn from "../../../assets/Banner.svg";
import ScrollCarousel from "scroll-carousel-react";
import imgSection1 from "../../../assets/imgSection1.svg";
import imgSection2 from "../../../assets/imgSection2.svg";
import imgSection3 from "../../../assets/imgSection3.svg";

export function FirstSection() {
  // Array de caminhos das imagens
  const imagePaths = [
    imgSection1,
    imgSection2,
    imgSection3,
    
  ];

  return (
    <section id="home">
      <img
        className={styles.bannerBarberOn}
        src={bannerBarberOn}
        alt="banner da barbearia"
      />
      <ScrollCarousel
        autoplay
        reinit
        autoplaySpeed={1}
        infinite={true}
        speed={1}
      >
        {imagePaths.map((imagem) => (
          <div key={imagem} className={styles.carouselItem}>
            <img
              src={imagem}
              alt={`Imagem ${imagem + 1}`}
              className={styles.carouselImage}
            />
          </div>
        ))}
      </ScrollCarousel>
    </section>
  );
}

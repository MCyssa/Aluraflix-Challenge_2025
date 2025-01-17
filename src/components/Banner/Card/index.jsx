import styles from "./Card.module.css";
import banner from "../../../assets/player.png";

function Card() {
    return (
        <div className={styles.container}>
            <div className={styles.sobre}>
                <div className={styles.categoria}>
                    <h2>Front End</h2>
                </div>
                <div className={styles.titulo}>
                    <h2>SEO com React</h2>
                </div>
                <div className={styles.texto}>
                    <p>Eu to aqui pra nesse vídeo dizer que a gente vai aprender a começar uma app inspirada no desenho Pokémon com Nextjs e React, ver algumas dicas sobre performance e de quebra conhecer uma plataforma sensacional pra fazer deploy que é a Vercel. Tudo em 22 minutos nesse vídeo feito com todo o carinho do mundo construindo uma "Pokedex"! </p>
                </div>
                <div className={styles.descricao}></div>
            </div>
            <div className={styles.imagem}>
                <img src={banner} alt="" />
            </div>
        </div>
    )
}

export default Card;
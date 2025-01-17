import styles from "./Banner.module.css";
import Card from "./Card";

function Banner() {
    return (
        <div className={styles.banner}>
            <div className={styles.imagem}>
                <div className={styles.overlay}></div>
                <Card />
            </div>
        </div>
    )
}

export default Banner;
import styles from "./Footer.module.css";
import footer from "../../assets/logo.png";

function Footer() {
    return (
        <footer className={styles.footer}>
            <img src={footer} alt="logo da Aluraflix" />
        </footer>
    )
}

export default Footer;
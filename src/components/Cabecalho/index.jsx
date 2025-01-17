
import styles from "./Cabecalho.module.css";
import logo from "../../assets/logo.png";
import Navbar from "../Navbar";

function Cabecalho() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="" />
            <Navbar />
            
        </header>
    )
}

export default Cabecalho;
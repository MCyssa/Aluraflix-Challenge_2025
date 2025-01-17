import { Link, useLocation } from "react-router-dom";
import styles from "./Links.module.css";

function Links({ to, activeIcon, inactiveIcon, children }) {
    const location = useLocation();
    const isActive = location.pathname === to;
    
    return (
        <>
            <Link className={`
                ${styles.link}
                ${isActive ? styles.linkAtivo : ""}
            `} to={to}>
                {children}
            </Link>
            <Link className={`
                ${styles.icon}
                ${isActive ? styles.iconAtivo : ""}
            `} to={to}>
                <img src={isActive ? activeIcon : inactiveIcon} alt={`${children} icon`} className={styles.iconImage} />
            </Link>
        </>
    );
}

export default Links;

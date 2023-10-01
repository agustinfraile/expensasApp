import React from "react";
import { Link } from "react-router-dom";

import styles from "./SlideBar.module.css";


const SlideBar = () => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.nav_ul}>
                <li className={styles.nav_ul_li}>
                    <Link 
                        to="/"
                        className={styles.nav_ul_li_link}
                    >
                        Inicio
                    </Link>
                </li>
                <li className={styles.nav_ul_li}>
                    <Link 
                        to="/departamentos"
                        className={styles.nav_ul_li_link}
                    >
                        Mis departamentos
                    </Link>
                </li>
                <li className={styles.nav_ul_li}>
                    <Link 
                        to="/departamento/nuevo"
                        className={styles.nav_ul_li_link}
                    >
                        Agregar departamento
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SlideBar;

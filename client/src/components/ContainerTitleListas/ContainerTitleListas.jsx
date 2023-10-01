import styles from './ContainerTitleListas.module.css';

const ContainerTitleListas = ({titleListas}) => {

    const obtenerTituloMayuscula = (titleListas) => {
        return titleListas.toUpperCase();
    }



    return (
        <div className={styles.containerTitleListas}>
            <h3 className={styles.containerTitleListas_title}>
                {obtenerTituloMayuscula(titleListas)}
            </h3>
        </div>
    )
}

export default ContainerTitleListas
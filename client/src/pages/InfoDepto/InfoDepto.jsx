import ContainerDescripcion from '../../components/ContainerDescripcion/ContainerDescripcion';
import ContainerTitle from '../../components/ContainerTitle/ContainerTitle';
import ContainerTitleListas from '../../components/ContainerTitleListas/ContainerTitleListas';
import styles from './InfoDepto.module.css';

const InfoDepto = () => {
  return (
    <main className={styles.infoDepto_container}>
        <ContainerTitle title="Información del Departamento" />

        <div className={styles.infoDepto_container_sections}>
            <section className={styles.infoDepto_container_left}>
                <ContainerTitleListas titleListas="Lista de personas" />
            </section>

            <section className={styles.infoDepto_container_right}>
                <ContainerDescripcion descripcion="Lorem ipsum dolor sit" />
                <ContainerTitleListas titleListas="Trabajadores | Servicios" />

            </section>
        </div>
    </main>
  )
}

export default InfoDepto;
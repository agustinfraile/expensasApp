import styles from './ContainerDescripcion.module.css';

const ContainerDescripcion = ({descripcion}) => {
  return (
    <div className={styles.containerDescripcion}>
        <p className={styles.containerDescripcion_descripcion}>{descripcion}</p>
    </div>
  )
}

export default ContainerDescripcion
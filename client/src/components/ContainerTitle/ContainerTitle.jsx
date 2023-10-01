import styles from './ContainerTitle.module.css';

const ContainerTitle = ({title}) => {
  return (
    <div className={styles.containerTitle}>
        <h1 className={styles.containerTitle_title}>{title}</h1>
    </div>
  )
}

export default ContainerTitle
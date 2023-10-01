import styles from './CardDeptosHome.module.css';

const CardDeptosHome = ({nombreDepto}) => {
  return (
    <div className={styles.cardDeptoHome_container}>
        <h2 className={styles.cardDeptoHome_container_title}>{nombreDepto}</h2>
    </div>
  )
}

export default CardDeptosHome
import { Link } from 'react-router-dom';
import ContainerEdificiosHome from '../../components/ContainerEdificiosHome/ContainerEdificiosHome';

import styles from './Home.module.css';

const Home = () => {
  return (
    <main className={styles.home_container}>
      <ContainerEdificiosHome />
    </main>
  )
}

export default Home
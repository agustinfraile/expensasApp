import { Link } from 'react-router-dom';
import styles from './MisDepartamentos.module.css';
import CardDeptosHome from '../../components/CardDeptosHome/CardDeptosHome';

const MisDepartamentos = () => {
  return (
    <main className={styles.misDepartamentos_container}>
        <h1>Mis departamentos:</h1>
        {/* todo: reemplazar por un map esto */}
        <Link to="/departamento/1">
          <CardDeptosHome nombreDepto={"Maipu 860"}/>
        </Link>
        <Link to="/departamento/1">
          <CardDeptosHome nombreDepto={"San Juan 1311"}/>
        </Link>
        <Link to="/departamento/1">
          <CardDeptosHome nombreDepto={"Catamarca 30"}/>
        </Link>
    </main>
  )
}

export default MisDepartamentos
import React from 'react';
import styles from './ContainerEdificiosHome.module.css';
import CardDeptosHome from '../CardDeptosHome/CardDeptosHome';
import { Link } from 'react-router-dom';

const ContainerEdificiosHome = () => {
  return (
    <div className={styles.containerEdificios}>

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

    </div>
  )
}

export default ContainerEdificiosHome
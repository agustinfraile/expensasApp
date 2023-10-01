import FormEdificio from '../../components/FormEdificio/FormEdificio'

import styles from './AgregarDepto.module.css';

const AgregarDepto = () => {
  return (
    <main className={styles.agregarDepto_container}>
        <h1>Agregar Departamento</h1>
        <div className={styles.agregarDepto_container_form}>
            <FormEdificio />   
        </div>
    </main>
  )
}

export default AgregarDepto
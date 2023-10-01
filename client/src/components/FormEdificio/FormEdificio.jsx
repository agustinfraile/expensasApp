import styles from "./FormEdificio.module.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';



const FormEdificio = () => {

    const handleFormSubmit = (values) => {
        
        console.log(values);
        values.haySubsuelo = values.haySubsuelo === "si" ? true : false;
    }


    return (
        <>
            <Formik
                initialValues={{
                    direccion: "",
                    descripcion: "",
                    pisos: "",
                    departamentos: "",
                    haySubsuelo: "",  
                    cantidadSubsuelos: "",
                }}
                validate={(values) => {
                    const errors = {};


                    if (!values.direccion) {
                        errors.direccion = "La direccion es requerida";
                    } else if (
                        !/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]{1,50}$/.test(
                            values.direccion
                        )
                    ) {
                        errors.direccion = "Complete direccion";
                    }
                    if (!values.descripcion) {
                        errors.descripcion = "La descripcion es requerida";
                    } else if (
                        !/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]{1,50}$/.test(
                            values.descripcion
                        )
                    ) {
                        errors.descripcion = "Complete descripcion";
                    }
                    if (!values.pisos) {
                        errors.pisos = "La cantidad de pisos es requerida";
                    } else if (!/^[0-9]{1,10}$/.test(values.pisos)) {
                        errors.pisos = "Complete la cantidad de pisos";
                    }
                    if (!values.departamentos) {
                        errors.departamentos =
                            "La cantidad de departamentos es requerida";
                    } else if (
                        !/^[0-9]{1,10}$/.test(values.departamentos)
                    ) {
                        errors.departamentos =
                            "Complete la cantidad de departamentos";
                    }
                    if (!values.haySubsuelo) {
                        errors.haySubsuelo = "Campo requerido";
                    } else if (
                        !/^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ\s]{1,50}$/.test(
                            values.haySubsuelo
                        )
                    ) {
                        errors.haySubsuelo = "Complete si hay subsuelo";
                    }

                    if (values.haySubsuelo === "si") {
                        if (!values.cantidadSubsuelos) {
                            errors.cantidadSubsuelos =
                                "La cantidad de subsuelos es requerida";
                        } else if (
                            !/^[0-9]{1,10}$/.test(values.cantidadSubsuelos)
                        ) {
                            errors.cantidadSubsuelos =
                                "Complete la cantidad de subsuelos";
                        }
                    }

                    return errors;
                }}
                onSubmit={handleFormSubmit}>
                {({ values, errors }) => (
                    <Form className={styles.formAddEdificio}>
                        <label>Direccion</label>
                        <Field type="text" name="direccion" placeholder="Direccion" />
                        <ErrorMessage name="direccion" component="div" />

                        <label>Descripcion</label>
                        <Field type="text" name="descripcion" placeholder="Descripcion" />
                        <ErrorMessage name="descripcion" component="div" />

                        <label>Cantidad de pisos</label>
                        <Field type="number" name="pisos" placeholder="Pisos" />
                        <ErrorMessage name="pisos" component="div" />

                        <label>Cantidad de departamentos</label>
                        <Field type="number" name="departamentos" placeholder="Departamentos" />
                        <ErrorMessage name="departamentos" component="div" />

                        <label>Hay subsuelo?</label>
                        <Field as="select" name="haySubsuelo">
                            <option value="">Seleccione</option>
                            <option value="si">Si</option>
                            <option value="no">No</option>
                        </Field>
                        <ErrorMessage name="haySubsuelo" component="div" />


                        {
                            values.haySubsuelo === "si" && (
                            <>
                                <label>Cantidad de subsuelos</label>
                                <Field type="number" name="cantidadSubsuelos" placeholder="Cantidad de subsuelos" />
                                <ErrorMessage name="cantidadSubsuelos" component="div" />
                            </>
                        )
                        }

                        {/* {console.log(values)} */}

                        {errors.direccion ||
                        errors.descripcion ||
                        errors.pisos ||
                        errors.departamentos ||
                        errors.haySubsuelo ||
                        errors.cantidadSubsuelos ||
                        !values.direccion ? (
                            <button disabled>
                                Cargar edificio
                            </button>
                        ) : (
                            <button type="submit">
                                Cargar edificio
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormEdificio;

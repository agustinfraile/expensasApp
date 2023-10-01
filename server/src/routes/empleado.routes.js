const { Router } = require('express');
const { Empleado } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { 
        nombre,
        apellido,
        email,
        telefono,
        puesto,
        sueldo
     } = req.body;

    try {
        // Validar que los campos no estén vacíos
        if (
            !nombre ||
            !apellido ||
            !email ||
            !telefono ||
            !puesto ||
            !sueldo
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el propietario ya existe por su correo electrónico
        const existingEmpleado = await Empleado.findOne({ where: { correoElectronico: email } });

        if (existingEmpleado) {
            return res.status(400).json({ error: "La persona ya existe." });
        }

        // Crear la persona trabajadora
        const personaTrabajadora = await Empleado.create({
            nombre: nombre,
            apellido: apellido,
            correoElectronico: email,
            telefono: telefono,
            puesto: puesto,
            sueldo: sueldo,
        });

        res.status(200).json({ message: "Persona trabajadora creada exitosamente.", personaTrabajadora });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear a la persona trabajadora." });
    }
});


router.get('/', async(req, res) => {
    try {
        const allTrabajadores = await Empleado.findAll();
        if(allTrabajadores){
            return res.status(200).json(allTrabajadores);
        } else {
            return res.status(404).json({message: "No hay personas trabajadoras cargadas previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los datos de las personas trabajadoras." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { 
        nombre,
        apellido,
        email,
        telefono,
        puesto,
        sueldo,
     } = req.body;
    
    try {
        // buscamos al propietario por id
        const empleadoID = await Empleado.findByPk(id);
        // si no hay propietario con ese id
        if(!empleadoID) {
            return res.status(404).json({error: "Persona trabajadora no encontrada"});
        }

        // actualizamos los datos del propietario
        if(nombre) {
            // si cambia el nombre
            empleadoID.nombre = nombre;
        }
        if(apellido) {
            // si cambia el apellido
            empleadoID.apellido = apellido;
        }
        if(email) {
            // si cambia el email
            empleadoID.email = email;
        }
        if(telefono) {
            // si cambia el telefono
            empleadoID.telefono = telefono;
        }
        if(puesto) {
            // si cambia el puesto
            empleadoID.puesto = puesto;
        }
        if(sueldo) {
            // si cambia el sueldo
            empleadoID.sueldo = sueldo;
        }

        // guardamos
        await empleadoID.save();

        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Persona trabajadora actualizada exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos de la persona trabajadora"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al empleado por id
        const empleadoID = await Propietario.findByPk(id);

        if (!empleadoID) {
            return res.status(404).json({ error: "Persona Trabajadora no encontrada." });
        }

        // Cambiamos el estado del empleado a false (lo ocultamos).
        empleadoID.estado = false;
        await empleadoID.save();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Propietario eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar la persona trabajadora." });
    }
    
});




module.exports = router;
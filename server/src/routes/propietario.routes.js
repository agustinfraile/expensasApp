const { Router } = require('express');
const { Propietario } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { nombre, apellido, email } = req.body;

    try {
        // Validar que los campos no estén vacíos
        if (!nombre || !apellido || !email) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el propietario ya existe por su correo electrónico
        const existingPropietario = await Propietario.findOne({ where: { correoElectronico: email } });

        if (existingPropietario) {
            return res.status(400).json({ error: "El propietario ya existe." });
        }

        // Crear el propietario
        const propietario = await Propietario.create({
            nombre: nombre,
            apellido: apellido,
            correoElectronico: email
        });

        res.status(200).json({ message: "Administrador creado exitosamente.", propietario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear al propietario." });
    }
});


router.get('/', async(req, res) => {
    try {
        const allPropietarios = await Propietario.findAll();
        if(allPropietarios){
            return res.status(200).json(allPropietarios);
        } else {
            return res.status(404).json({message: "No hay propietarios cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los datos de los propietarios." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { nombre, apellido, email, pass } = req.body;
    
    try {
        // buscamos al propietario por id
        const propietarioId = await Propietario.findByPk(id);
        // si no hay propietario con ese id
        if(!propietarioId) {
            return res.status(404).json({error: "Propietario no encontrado"});
        }

        // actualizamos los datos del propietario
        if(nombre) {
            // si cambia el nombre
            propietarioId.nombre = nombre;
        }
        if(apellido) {
            // si cambia el apellido
            propietarioId.apellido = apellido;
        }
        if(email) {
            // si cambia el email
            propietarioId.email = email;
        }

        // guardamos
        await propietarioId.save();

        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Propietario actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos del propietario"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al propietario por id
        const propietarioId = await Propietario.findByPk(id);

        if (!propietarioId) {
            return res.status(404).json({ error: "Propietario no encontrado." });
        }

        // Elimina al propietario de la base de datos
        await propietarioId.destroy();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Propietario eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el propietario." });
    }
    
});




module.exports = router;
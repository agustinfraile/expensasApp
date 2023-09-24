const { Router } = require('express');
const { Administrador } = require("../../postgres");

const router = Router();

router.post("/", async (req, res) => {
    const { nombre, apellido, email, pass } = req.body;
    
    try {
        // Validar que los campos no estén vacíos
        if (!nombre || !apellido || !email || !pass) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el administrador ya existe por su correo electrónico
        const existingAdmin = await Administrador.findOne({ where: { email: email } });

        if (existingAdmin) {
            return res.status(400).json({ error: "El administrador ya existe." });
        }

        // Crear el administrador
        const admin = await Administrador.create({
            nombre: nombre,
            apellido: apellido,
            email: email,
            pass: pass,
        });

        res.status(200).json({ message: "Administrador creado exitosamente.", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear al administrador." });
    }
});

router.get('/', async(req, res) => {
    try {
        const allAdmins = await Administrador.findAll();
        if(allAdmins){
            return res.status(200).json(allAdmins);
        } else {
            return res.status(404).json({message: "No hay administradores cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los datos de los administradores." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { nombre, apellido, email, pass } = req.body;
    
    try {
        // buscamos al admin por id
        const admin = await Administrador.findByPk(id);
        // si no hay admin con ese id
        if(!admin) {
            return res.status(404).json({error: "Administrdor no encontrado"});
        }
        // actualizamos los datos del admin
        if(nombre) {
            // si cambia el nombre
            admin.nombre = nombre;
        }
        if(apellido) {
            // si cambia el apellido
            admin.apellido = apellido;
        }
        if(email) {
            // si cambia el email
            admin.email = email;
        }
        if(pass) {
            // si cambia la contraseña
            admin.pass = pass;
        }

        // guardamos
        await admin.save();

        // retornamos el o los nuevos valores
        return res.status(200).json(admin);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos del administrador"});
    }
});


// todo: modificar este endpoint para que no se borre el admin, solo se oculte
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al admin por id
        const admin = await Administrador.findByPk(id);

        if (!admin) {
            return res.status(404).json({ error: "Administrador no encontrado." });
        }

        // Elimina el administrador de la base de datos
        await admin.destroy();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Administrador eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el administrador." });
    }
    
});


module.exports = router;
const { Router } = require('express');
const { ServicioMensual } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { 
        tituloServicio,
        monto,
        descripcion
     } = req.body;

    try {
        // Validar que los campos no estén vacíos
        if (
            !tituloServicio ||
            !monto ||
            !descripcion
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Verificar si el propietario ya existe por su correo electrónico
        const servicioExisting = await ServicioMensual.findOne({ where: { tituloServicio: tituloServicio } });

        if (servicioExisting) {
            return res.status(400).json({ error: "El servicio ya existe." });
        }

        // Crear el servicio mensual
        const servicioMensual = await ServicioMensual.create({
            tituloServicio: tituloServicio,
            monto: monto,
            descripcion: descripcion,
        });

        res.status(200).json({ message: "Servicio mensual creado exitosamente.", servicioMensual });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear al servicio mensual." });
    }
});


router.get('/', async(req, res) => {
    try {
        const allServicios = await ServicioMensual.findAll();
        if(allServicios){
            return res.status(200).json(allServicios);
        } else {
            return res.status(404).json({message: "No hay servicios cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los datos de los servicios." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { 
        tituloServicio,
        monto,
        descripcion
    } = req.body;
    
    try {
        // buscamos al servicio por id
        const servicioID = await ServicioMensual.findByPk(id);
        // si no hay servicio con ese id
        if(!servicioID) {
            return res.status(404).json({error: "Servicio no encontrado"});
        }

        // actualizamos los datos del servicio
        if(tituloServicio){
            servicioID.tituloServicio = tituloServicio;
        }   
        if(monto){
            servicioID.monto = monto;
        }
        if(descripcion){
            servicioID.descripcion = descripcion;
        }

        // guardamos
        await servicioID.save();

        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Servicio actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos del servicio"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al servicio por id
        const servicioID = await ServicioMensual.findByPk(id);

        if (!servicioID) {
            return res.status(404).json({ error: "Servicio no encontrado." });
        }

        // Cambiamos el estado del servicio a false (lo ocultamos).
        servicioID.estado = false;
        await servicioID.save();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Servicio eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar al servicio." });
    }
    
});




module.exports = router;
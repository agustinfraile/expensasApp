const { Router } = require('express');
const { Ingreso } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { 
        monto,
        edificioAsociado,
        descripcion,
        fecha,
        personaQueIngreso
     } = req.body;

    try {
        // Validar que los campos no estén vacíos
        if (
            !monto ||
            !edificioAsociado ||
            !descripcion ||
            !fecha ||
            !personaQueIngreso
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Crear el ingreso mensual
        const ingreso = await Ingreso.create({
            monto: monto,
            edificioAsociado: edificioAsociado,
            descripcion: descripcion,
            fecha: fecha,
            personaQueIngreso: personaQueIngreso
        });

        res.status(200).json({ message: "Ingreso creado exitosamente.", ingreso });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear el ingreso." });
    }
});


router.get('/', async(req, res) => {
    try {
        const allIngresos = await Ingreso.findAll();
        if(allIngresos){
            return res.status(200).json(allIngresos);
        } else {
            return res.status(404).json({message: "No hay ingresos cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los ingresos." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { 
        monto,
        edificioAsociado,
        descripcion,
        fecha,
        personaQueIngreso
    } = req.body;
    
    try {
        // buscamos al ingreso por id
        const ingresoID = await Ingreso.findByPk(id);
        // si no hay ingreso con ese id
        if(!ingresoID) {
            return res.status(404).json({error: "Ingreso no encontrado"});
        }

        // actualizamos los datos del ingreso
        if(monto) {
            ingresoID.monto = monto;
        }
        if(edificioAsociado) {
            ingresoID.edificioAsociado = edificioAsociado;
        }
        if(descripcion) {
            ingresoID.descripcion = descripcion;
        }
        if(fecha) {
            ingresoID.fecha = fecha;
        }
        if(personaQueIngreso) {
            ingresoID.personaQueIngreso = personaQueIngreso;
        }

        // guardamos
        await ingresoID.save();

        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Ingreso actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos del Ingreso"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al ingreso por id
        const ingresoID = await Ingreso.findByPk(id);

        if (!ingresoID) {
            return res.status(404).json({ error: "Ingreso no encontrado." });
        }

        // Cambiamos el estado del ingreso a false (lo ocultamos).
        ingresoID.estado = false;
        await ingresoID.save();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Ingreso eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el ingreso." });
    }
    
});




module.exports = router;
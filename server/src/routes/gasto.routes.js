const { Router } = require('express');
const { Gasto } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { 
        monto,
        edificioAsociado,
        descripcion,
        fecha
     } = req.body;

    try {
        // Validar que los campos no estén vacíos
        if (
            !monto ||
            !edificioAsociado ||
            !descripcion ||
            !fecha
        ) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Crear el gasto mensual
        const gasto = await Gasto.create({
            monto: monto,
            edificioAsociado: edificioAsociado,
            descripcion: descripcion,
            fecha: fecha,
        });

        res.status(200).json({ message: "Gasto creado exitosamente.", gasto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear el gasto." });
    }
});


router.get('/', async(req, res) => {
    try {
        const allGastos = await Gasto.findAll();
        if(allGastos){
            return res.status(200).json(allGastos);
        } else {
            return res.status(404).json({message: "No hay gastos cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los gastos de los servicios." });
    }
});


router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { 
        monto,
        edificioAsociado,
        descripcion,
        fecha
    } = req.body;
    
    try {
        // buscamos al gasto por id
        const gastoID = await Gasto.findByPk(id);
        // si no hay gasto con ese id
        if(!gastoID) {
            return res.status(404).json({error: "Gasto no encontrado"});
        }

        // actualizamos los datos del gasto
        if(monto) {
            gastoID.monto = monto;
        }
        if(edificioAsociado) {
            gastoID.edificioAsociado = edificioAsociado;
        }
        if(descripcion) {
            gastoID.descripcion = descripcion;
        }
        if(fecha) {
            gastoID.fecha = fecha;
        }

        // guardamos
        await gastoID.save();

        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Gasto actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos del gasto"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos al gasto por id
        const gastoID = await Gasto.findByPk(id);

        if (!gastoID) {
            return res.status(404).json({ error: "Gaasto no encontrado." });
        }

        // Cambiamos el estado del gasto a false (lo ocultamos).
        gastoID.estado = false;
        await gastoID.save();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Gasto eliminado exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el gasto." });
    }
    
});




module.exports = router;
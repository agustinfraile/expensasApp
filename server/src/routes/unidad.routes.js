const { Router } = require('express');
const { Unidad } = require("../../postgres");

const router = Router();

router.post("/", async (req, res) => {
    const { referencia, numero, metros } = req.body;
    
    try {
        // Validar que los campos no estén vacíos
        if (!referencia || !numero || !metros) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }

        // Crear la unidad
        const unidad = await Unidad.create({
            referenciaUnidad: referencia,
            numeroUnidad: numero,
            metrosCuadrados: metros
        });

        res.status(200).json({ message: "Unidad creado exitosamente.", unidad });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al crear la unidad." });
    }
});

router.get('/', async(req, res) => {
    try {
        const allUnidades = await Unidad.findAll();
        if(allUnidades){
            return res.status(200).json(allUnidades);
        } else {
            return res.status(404).json({message: "No hay unidades cargados previamente"})
        }
    } catch (error) {
        res.status(500).json({ error: "Hubo un problema al cargar los datos de las unidades." });
    }
});

router.put('/:id', async(req, res) => {
    
    const { id } = req.params;
    const { referencia, numero, metros } = req.body;

    
    try {
        // buscamos al unidad por id
        const unidadId = await Unidad.findByPk(id);
        // si no hay unidad con ese id
        if(!unidadId) {
            return res.status(404).json({error: "Unidad no encontrada"});
        }
        // actualizamos los datos del unidad
        if(referencia) {
            // si cambia la referencia
            unidadId.referenciaUnidad = referencia;
        }
        if(numero) {
            // si cambia el numero
            unidadId.numeroUnidad = numero;
        }
        if(metros) {
            // si cambia los metros
            unidadId.metrosCuadrados = metros;
        }

        // guardamos
        await unidadId.save();

        // retornamos el o los nuevos valores
        return res.status(200).json(unidadId);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Hubo un problema al actualizar los datos de la unidad"});
    }
});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    try {
        // buscamos a la unidad por id
        const unidadId = await Unidad.findByPk(id);
        // si no hay unidad con ese id
        if(!unidadId) {
            return res.status(404).json({error: "Unidad no encontrada"});
        }

        // Elimina la unidad de la base de datos
        await unidadId.destroy();

        // Retorna un mensaje de éxito como respuesta
        res.status(200).json({ message: "Unidad eliminada exitosamente." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un problema al eliminar la unidad." });
    }
    
});

module.exports = router;
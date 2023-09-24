const { Router } = require('express');
const {Consorcio} = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { nombre, direccion } = req.body;

    try {

        if(!nombre || !direccion) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // verifico si el consorcio ya existe por su ubicacion
        const consorcioExistente = await Consorcio.findOne({
            where: { direccion: direccion }
        });

        if(consorcioExistente) {
            return res.status(400).json({ error: "Ya existe un consorcio con esa direccion" });
        }

        // creo el consorcio
        const consorcio = await Consorcio.create({
            nombre: nombre,
            direccion: direccion
        });

        // si todo sale ok 
        res.status(200).json({ message: "Consorcio creado exitosamente", consorcio });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un porblema al crear al consorcio" });
    }
});


router.get('/', async(req, res) => {
    try {
        const allConsorcios = await Consorcio.findAll();

        if(allConsorcios) {
            return res.status(200).json(allConsorcios);
        } else {
            return res.status(400).json({ message: "No hay consorcios cargados previamente" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un problema al cargar los datos de los consorcios." });
    }
});

router.put("/:id", async(req, res) => {
    // sacamos el id de los parametros
    const { id } = req.params;

    // sacamos los datos que queremos cambiar del body
    const { nombre, direccion } = req.body;

    try {
        // buscamos al consorcio por id
        const consorcioId = await Consorcio.findByPk(id);

        // si no hay consorcios con ese id retornamos
        if(!consorcioId) res.status(400).json({error: "Consorcio no encontrado"});

        // actualizamos los datos del consorcio
        if(nombre) consorcioId.nombre = nombre;
        if(direccion) consorcioId.direccion = direccion;
        
        // guardamos
        await consorcioId.save();
        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Consorcio actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Hubo un problema al actualizar los datos del consorcio" });
    }
});

router.delete('/:id', async(req, res) => {
    // sacamos el id de los parametros
    const { id } = req.params;

    try {
        // buscamos el consorcio por id
        const deleteConsorcio = await Consorcio.findByPk(id);
        
        // si no hay consorcio con ese id 
        if(!deleteConsorcio) {
            return res.status(404).json({error: "Consorcio no encontrado"});
        }

        // eliminamos el consorcio de la base de datos
        await deleteConsorcio.destroy();

        // retornamos un mensaje de exito como respuesta
        res.status(200).json({ message: "Consorcio eliminado exitosamente "});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el consorcio." });
    }

});


module.exports = router;
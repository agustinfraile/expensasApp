const { Router } = require('express');
const { Edificio } = require("../../postgres");

const router = Router();

router.post('/', async (req, res) => {
    const { 
        direccion,
        descripcion,
        pisos,
        subsuelo,
        unidadesEdificio,
        cantidadSubsuelo, 
    } = req.body;

    try {

        if ( 
            !direccion 
            || !descripcion
            || !pisos
            || !unidadesEdificio
        ) { 
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // verifico si el Edificio ya existe por su ubicacion
        const edificioExistente = await Edificio.findOne({
            where: { direccion: direccion }
        });

        if(edificioExistente) {
            return res.status(400).json({ error: "Ya existe un Edificio con esa direccion" });
        }

        // creo el Edificio
        const edificio = await Edificio.create({
            direccion: direccion,
            descripcion: descripcion,
            pisos: pisos,
            haySubsuelo: subsuelo,
            cantidadSubsuelo: cantidadSubsuelo,
            unidadesDelEdificio: unidadesEdificio
        });

        // si todo sale ok 
        res.status(200).json({ message: "edificio creado exitosamente", edificio });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un problema al crear al edificio" });
    }
});


router.get('/', async(req, res) => {
    try {
        const allEdificios = await Edificio.findAll();

        if(allEdificios) {
            return res.status(200).json(allEdificios);
        } else {
            return res.status(400).json({ message: "No hay edificios cargados previamente" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un problema al cargar los datos de los edificios." });
    }
});

router.put("/:id", async(req, res) => {
    // sacamos el id de los parametros
    const { id } = req.params;

    // sacamos los datos que queremos cambiar del body
    const { 
        direccion,
        descripcion,
        pisos,
        subsuelo,
        unidadesEdificio,
        cantidadSubsuelo, 
    } = req.body;

    try {
        // buscamos al consorcio por id
        const edificioID = await Edificio.findByPk(id);

        // si no hay Edificios con ese id retornamos
        if(!edificioID) res.status(400).json({error: "Edificio no encontrado"});

        // actualizamos los datos del Edificio
        if(direccion) edificioID.direccion = direccion;
        if(descripcion) edificioID.descripcion = descripcion;
        if(pisos) edificioID.pisos = pisos;
        if(subsuelo != null) edificioID.haySubsuelo = subsuelo;
        if(unidadesEdificio) edificioID.unidadesDelEdificio = unidadesEdificio;
        if(cantidadSubsuelo >= 0) edificioID.cantidadSubsuelo = cantidadSubsuelo;

        
        // guardamos
        await edificioID.save();
        // retornamos el o los nuevos valores
        return res.status(200).json({ message: "Edificio actualizado exitosamente"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Hubo un problema al actualizar los datos del Edificio" });
    }
});

router.delete('/:id', async(req, res) => {
    // sacamos el id de los parametros
    const { id } = req.params;

    try {
        // buscamos el Edificio por id
        const deleteEdificio = await Edificio.findByPk(id);
        
        // si no hay Edificio con ese id 
        if(!deleteEdificio) {
            return res.status(404).json({error: "Edificio no encontrado"});
        }

        // Cambiamos el estado del edificio a false (lo ocultamos).
        deleteEdificio.estado = false;
        await deleteEdificio.save();

        // retornamos un mensaje de exito como respuesta
        res.status(200).json({ message: "Edificio eliminado exitosamente "});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Hubo un problema al eliminar el Edificio." });
    }

});


module.exports = router;
const { Router } = require('express');

const Administrador = require('./admin.routes');
const Consorcio = require('./consorcio.routes');
const Propietario = require('./propietario.routes');
const Unidad = require('./unidad.routes');

const router = Router();

router.use("/administrador", Administrador);
router.use("/consorcio", Consorcio);
router.use("/propietario", Propietario);
router.use("/unidad", Unidad);




module.exports = router;
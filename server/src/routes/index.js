const { Router } = require('express');

const Administrador = require('./admin.routes');
const Edificio = require('./edificio.routes');
const Propietario = require('./propietario.routes');
const Unidad = require('./unidad.routes');
const Empleado = require('./empleado.routes');
const ServicioMensual = require('./servicios.routes');
const Gasto = require('./gasto.routes');
const Ingreso = require('./ingreso.routes');

const router = Router();

router.use("/administrador", Administrador);
router.use("/edificio", Edificio);
router.use("/propietario", Propietario);
router.use("/unidad", Unidad);
router.use("/empleado", Empleado);
router.use("/servicioMensual", ServicioMensual);
router.use("/gasto", Gasto);
router.use("/ingreso", Ingreso);




module.exports = router;
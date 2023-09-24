const { Router } = require('express');

const Administrador = require('./admin.routes');
const Consorcio = require('./consorcio.routes');

const router = Router();

router.use("/administrador", Administrador);
router.use("/consorcio", Consorcio);




module.exports = router;
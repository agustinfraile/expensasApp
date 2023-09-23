const { Router } = require('express');

const Administrador = require('./admin.routes');

const router = Router();

 router.use("/administrador", Administrador);




module.exports = router;
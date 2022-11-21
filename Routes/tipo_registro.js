const { getTipo_Registro } = require("../Controllers/Tipo_registro");
const express = require("express");
const router = express.Router();

router.route("/tiporegistro").get(getTipo_Registro);

module.exports = router;

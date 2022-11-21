const { getTipo_Registro } = require("../Controllers/Tipo_registro");
const express = require("express");
const router = express.Router();
const Tp = require("../Models/Tipo_registro");

router.route("/tiporegistro").get(getTipo_Registro);

module.exports = router;

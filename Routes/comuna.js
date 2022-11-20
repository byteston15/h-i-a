const express = require("express");
const router = express.Router();
const { getComunas, getSucursalByComuna } = require("../Controllers/comuna.js");

router.route("/comunas").get(getComunas);
router.route("/comunas/:id/sucursales").get(getSucursalByComuna);

module.exports = router;

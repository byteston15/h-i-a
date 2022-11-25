const express = require("express");
const router = express.Router();
const {
  getReporteUsuario,
  getReporteSucursal,
} = require("../Controllers/reporte");

router.route("/reporte/usuario").get(getReporteUsuario);
router.route("/reporte/sucursales").get();

module.exports = router;

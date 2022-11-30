const express = require("express");
const router = express.Router();
const {
  getReporteUsuario,
  getReportePermisosByUser,
  getAtrasosByuser,
} = require("../Controllers/reporte");

router.route("/reporte/usuario/").get(getReporteUsuario);

router.route("/reporte/usuario/:id").get(getReportePermisosByUser);

router.route("/reporte/usuario/:id/atrasos").get(getAtrasosByuser);

module.exports = router;

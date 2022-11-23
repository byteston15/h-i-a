const express = require("express");
const router = express.Router();
const {
  createTpermiso,
  deleteTpermiso,
  getTpermisos,
  updateTpermiso,
  getPermisos,
} = require("../Controllers/tipo_permiso");

router.route("/tpermisos").get(getTpermisos).post(createTpermiso);
router.route("/tpermisos/:id").put(updateTpermiso).delete(deleteTpermiso);
router.route("/tpermisos/:id/permisos").get(getPermisos);
module.exports = router;

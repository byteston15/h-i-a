const express = require("express");
const router = express.Router();
const {
  createTpermiso,
  deleteTpermiso,
  getTpermisos,
  updateTpermiso,
} = require("../Controllers/tipo_permiso");

router.route("/tpermiso").get(getTpermisos).post(createTpermiso);
router.route("/tpermiso/:id").put(updateTpermiso).delete(deleteTpermiso);

module.exports = router;

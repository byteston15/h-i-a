const express = require("express");
const router = express.Router();
const {
  createPermiso,
  deletePermiso,
  getPermisos,
  updatePermiso,
  getDocumentoByPermiso, //id por documentos
} = require("../Controllers/permiso");

const {
  createDocumento,
  deleteDocumento,
  updateDocumento,
} = require("../Controllers/documento");

router.route("/permiso").get(getPermisos).post(createPermiso);
router.route("/permiso/:id").delete(deletePermiso).put(updatePermiso);

router.route("/permiso/documento").post(createDocumento);
router.route("/permiso/:id/documento"); //id por documentos
router
  .route("/permiso/documento/:id")
  .put(updateDocumento)
  .delete(deleteDocumento);

module.exports = router;

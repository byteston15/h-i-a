const express = require("express");
const router = express.Router();
const {
  getRegistros,
  updateRegistro,
  deleteRegistro,
  createRegistro,
} = require("../Controllers/registro");

router.route("/registro").get(getRegistros).post(createRegistro);
router.route("/registro/:id").put(updateRegistro).delete(deleteRegistro);

module.exports = router;

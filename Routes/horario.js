const express = require("express");
const router = express.Router();
const {
  createHorario,
  getHorarios,
  updateHorario,
  deleteHorario,
} = require("../Controllers/horario.js");

router.route("/horarios").post(createHorario).get(getHorarios);
router.route("/horarios/:id").put(updateHorario).delete(deleteHorario);

module.exports = router;

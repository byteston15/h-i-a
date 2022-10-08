const express = require("express");
const router = express.Router();
const {
  getHorarios,
  updateHorario,
  createHorario,
  deleteHorario,
} = require("../Controllers/dia_horario.js");

router.route("/horarios-dia").get(getHorarios).post(createHorario);
router.route("/horarios-dia/:id").put(updateHorario).delete(deleteHorario);

module.exports = router;

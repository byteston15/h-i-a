const express = require("express");
const router = express.Router();
const {
  createHorario,
  getHorarios,
  updateHorario,
  deleteHorario,
  getFullHorario,
} = require("../Controllers/horario.js");

router.route("/horarios").post(createHorario).get(getHorarios);
//solo trae los id y nombre de horarios, por si no se han creado o para listar en selección

router.route("/horarioFull").get(getFullHorario);
//Envia información completa y puede recibir query = id_horario para filtrar

router.route("/horarios/:id").put(updateHorario).delete(deleteHorario);

module.exports = router;

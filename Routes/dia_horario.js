const express = require("express");
const router = express.Router();
const {
  updateHorario,
  createHorario,
  deleteHorario,
} = require("../Controllers/dia_horario.js");

router.route("/horarios-dias").post(createHorario);
router
  .route("/horarios-dias/:idhorario/:dia")
  .put(updateHorario)
  .delete(deleteHorario);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUsuario,
  listUsers,
  updateUser,
} = require("../Controllers/usuario");

router.route("/user").get(listUsers).post(createUser);
router.route("/user/:id").delete(deleteUsuario).put(updateUser);

module.exports = router;

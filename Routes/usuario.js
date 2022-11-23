const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUsuario,
  listUsers,
  updateUser,
} = require("../Controllers/usuario");

router.route("/users").get(listUsers).post(createUser);
router.route("/users/:id").delete(deleteUsuario).put(updateUser);

module.exports = router;

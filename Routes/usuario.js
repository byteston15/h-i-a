const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUsuario,
  listUsers,
  updateUser,
  getUser,
} = require("../Controllers/usuario");

router.route("/users").get(listUsers).post(createUser);
router.route("/users/:id").delete(deleteUsuario).put(updateUser).get(getUser);

module.exports = router;

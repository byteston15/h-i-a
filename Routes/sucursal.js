const express = require("express");
const router = express.Router();
const {
  createSucursal,
  listSucursales,
  updateSucursal,
  deleteSucursal,
  getUserBySucursal,
} = require("../Controllers/sucursal.js");

router.route("/sucursales").post(createSucursal).get(listSucursales);
router.route("/sucursales/:id").delete(deleteSucursal).put(updateSucursal);
router.route("/sucursales/:id/users").get(getUserBySucursal);

module.exports = router;

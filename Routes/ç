const express = require("express")
const router = express.Router()
const {createSucursal, listSucursales, updateSucursal, deleteSucursal} = require("../Controllers/sucursal.js")


router.route('/sucursales').post(createSucursal).get(listSucursales)
router.route('/sucursales/:id').delete(deleteSucursal).put(updateSucursal)


module.exports = router

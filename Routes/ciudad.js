const {getCiudades, getComunaByCiudad} = require("../Controllers/ciudad.js")
const express = require("express")
const router = express.Router()


router.route("/ciudades").get(getCiudades)
router.route("/ciudades/:id").get(getComunaByCiudad)


module.exports = router

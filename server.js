const express = require("express")
const colors = require("colors")
const dotenv = require("dotenv")
const {testDb} = require("./Config/testDb")
const r_ciudad = require("./Routes/ciudad.js")
const r_comuna = require("./Routes/comuna.js")
const r_sucursal = require("./Routes/sucursal.js")


//Instances
dotenv.config({path : './Config/config.env'})
const PORT = process.env.PORT || 8080
const app = express() 


testDb()


//Middlewares
app.use(express.json())

//Rutas
app.use(process.env.ROUTE, r_ciudad )
app.use(process.env.ROUTE, r_comuna)
app.use(process.env.ROUTE, r_sucursal)
app.listen(PORT, console.log(`Running on http://localhost:${PORT}`.grey))


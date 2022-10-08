const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const { testDb } = require("./Config/testDb");
const r_ciudad = require("./Routes/ciudad.js");
const r_comuna = require("./Routes/comuna.js");
const r_sucursal = require("./Routes/sucursal.js");
const r_horario = require("./Routes/horario.js");
const r_dia_horario = require("./Routes/dia_horario");
const r_dias = require("./Routes/dias");

//Instances
dotenv.config({ path: "./Config/config.env" });
const PORT = process.env.PORT || 8080;
const app = express();

testDb();

//Middlewares
app.use(express.json());

//Rutas
app.use(process.env.ROUTE, r_ciudad);
app.use(process.env.ROUTE, r_comuna);
app.use(process.env.ROUTE, r_sucursal);
app.use(process.env.ROUTE, r_horario);
app.use(process.env.ROUTE, r_dia_horario);
app.use(process.env.ROUTE, r_dias);

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`.grey));

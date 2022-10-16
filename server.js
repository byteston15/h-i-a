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
const r_tipo_registro = require("./Routes/tipo_registro");
const r_user = require("./Routes/usuario");
const r_registro = require("./Routes/registro");
const r_tipo_permiso = require("./Routes/tipo_permiso");
const r_permiso = require("./Routes/permiso.js");

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
app.use(process.env.ROUTE, r_tipo_registro);
app.use(process.env.ROUTE, r_user);
app.use(process.env.ROUTE, r_registro);
app.use(process.env.ROUTE, r_tipo_permiso);
app.use(process.env.ROUTE, r_permiso);

app.listen(PORT, console.log(`Running on http://localhost:${PORT}`.grey));

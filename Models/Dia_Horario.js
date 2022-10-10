const sq = require("../Config/db");
const { DataTypes } = require("sequelize");

const Dia_Horario = sq.define(
  "Dia_Horario",
  {
    ingreso: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    salida: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    comienzo_colacion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    fin_colacion: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  { freezeTableName: true, paranoid: true }
);

module.exports = Dia_Horario;

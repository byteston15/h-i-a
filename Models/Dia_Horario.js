const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const Horario = require("./Horario");
const Dias = require("./Dias");

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
    tiempo_colacion: {
      type: DataTypes.INTEGER(2),
      defaultValue: 60,
      allowNull: true,
      validate: {
        max: {
          args: 120,
          msg: "El máximo es de 120 minutos",
        },
      },
    },
    tiempo_espera: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: 15,
    },
    tiempo_salida: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
      defaultValue: 15,
    },
  },
  { freezeTableName: true, paranoid: true }
);

module.exports = Dia_Horario;

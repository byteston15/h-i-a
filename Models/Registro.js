const sq = require("../Config/db");
const { DataTypes } = require("sequelize");

const Registro = sq.define(
  "Registro",
  {
    id_registro: {
      type: DataTypes.INTEGER(9),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    registro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { paranoid: true, freezeTableName: true }
);

module.exports = Registro;

const { DataTypes } = require("sequelize");
const sq = require("../Config/db");

const Documento = sq.define(
  "Documento",
  {
    id_doc: {
      type: DataTypes.INTEGER(9),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ruta: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  { paranoid: false, freezeTableName: true }
);

module.exports = Documento;

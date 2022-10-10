const sq = require("../Config/db");
const { DataTypes } = require("sequelize");

const Tipo_Registro = sq.define(
  "Tipo_Registro",
  {
    id_tipo_registro: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(3),
    },
    nombre: {
      allowNull: false,
      validate: { min: 3, max: 100 },
      type: DataTypes.STRING(100),
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Tipo_Registro;

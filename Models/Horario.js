const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");

const Horario = sq.define(
  "Horario",
  {
    id_horario: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Horario;

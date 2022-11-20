const sq = require("../Config/db");
const { DataTypes } = require("sequelize");

const Dias = sq.define(
  "Dias",
  {
    id_dias: {
      type: DataTypes.INTEGER(1),
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

module.exports = Dias;

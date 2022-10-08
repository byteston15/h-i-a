const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");

const Sucursal = sq.define(
  "Sucursal",
  {
    id_sucursal: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
    localizacion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "SIN ESPECIFICAR", //después configura
    },
    direccion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      set(val) {
        this.setDataValue("direccion", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true }
);

module.exports = Sucursal;

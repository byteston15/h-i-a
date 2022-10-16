const sq = require("../Config/db");
const { DataTypes } = require("sequelize");

const Permiso = sq.define(
  "Permiso",
  {
    id_permiso: {
      type: DataTypes.INTEGER(9),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comienzo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    termino: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    comentario: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: "",
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { freezeTableName: true, paranoid: true }
);

module.exports = Permiso;

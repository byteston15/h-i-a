const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const Documento = require("./Documento");

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

Permiso.hasMany(Documento, {
  foreignKey: {
    name: "fk_permiso",
    allowNull: false,
  },
  sourceKey: "id_permiso",
});

Documento.belongsTo(Permiso, {
  foreignKey: {
    name: "fk_permiso",
    allowNull: false,
  },
  targetKey: "id_permiso",
});

module.exports = Permiso;

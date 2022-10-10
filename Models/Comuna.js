const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Sucursal = require("./Sucursal.js");

const Comuna = sq.define(
  "Comuna",
  {
    id_comuna: {
      type: DataTypes.INTEGER(3),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
  },
  { freezeTableName: true, timestamps: false }
);

Comuna.hasMany(Sucursal, {
  foreignKey: {
    name: "fk_comuna_sucursal",
    allowNull: false,
  },
  sourceKey: "id_comuna",
});

Sucursal.belongsTo(Comuna, {
  foreignKey: {
    name: "fk_comuna_sucursal",
    allowNull: false,
  },
  targetKey: "id_comuna",
});

module.exports = Comuna;

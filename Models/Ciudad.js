const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Comuna = require("./Comuna.js");

const Ciudad = sq.define(
  "Ciudad",
  {
    id_ciudad: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
  },
  { freezeTableName: true }
);

Ciudad.hasMany(Comuna, {
  foreignKey: {
    name: "fk_ciudad_comuna",
    allowNull: false,
  },
  sourceKey: "id_ciudad",
  allowNull: false,
});

Comuna.belongsTo(Ciudad, {
  foreignKey: {
    name: "fk_ciudad_comuna",
    allowNull: false,
  },
  targetKey: "id_ciudad",
  allowNull: false,
});

module.exports = Ciudad;

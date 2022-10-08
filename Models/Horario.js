const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Dia_Horario = require("../Models/Dia_Horario");

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

Horario.hasMany(Dia_Horario, {
  foreignKey: {
    name: "fk_id_horario",
    allowNull: false,
  },
  primaryKey: true,
  sourceKey: "id_horario",
});

Dia_Horario.belongsTo(Horario, {
  foreignKey: { name: "fk_id_horario", allowNull: false },
  primaryKey: true,
  targetKey: "id_horario",
});

module.exports = Horario;

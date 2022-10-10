const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const Dia_Horario = require("../Models/Dia_Horario");

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

Dias.hasMany(Dia_Horario, {
  foreignKey: {
    name: "fk_id_dia",
    allowNull: false,
  },
  sourceKey: "id_dias",
});

Dia_Horario.belongsTo(Dias, {
  foreignKey: {
    name: "fk_id_dia",
    allowNull: false,
  },
  targetKey: "id_dias",
  primaryKey: true,
});

module.exports = Dias;

const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Dia_Horario = require("./Dia_Horario");
const Usuario = require("./Usuario");

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
  { freezeTableName: true, paranoid: true }
);

Horario.hasMany(Dia_Horario, {
  foreignKey: {
    name: "fk_id_horario",
    allowNull: false,
  },
  primaryKey: true,
  sourceKey: "id_horario",
});

Horario.hasMany(Usuario, {
  foreignKey: {
    name: "fk_horario_usuario",
    allowNull: true,
  },
  sourceKey: "id_horario",
});

Dia_Horario.belongsTo(Horario, {
  foreignKey: { name: "fk_id_horario", allowNull: false },
  primaryKey: true,
  targetKey: "id_horario",
});

Usuario.belongsTo(Horario, {
  foreignKey: {
    name: "fk_horario_usuario",
    allowNull: false,
  },
  targetKey: "id_horario",
});

module.exports = Horario;

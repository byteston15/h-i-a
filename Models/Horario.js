const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario");
const Dias = require("./Dias");
const Dia_Horario = require("./Dia_Horario");

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

Horario.hasMany(Usuario, {
  foreignKey: {
    name: "fk_horario_usuario",
    allowNull: false,
  },
  sourceKey: "id_horario",
});

Usuario.belongsTo(Horario, {
  foreignKey: {
    name: "fk_horario_usuario",
    allowNull: false,
  },
  targetKey: "id_horario",
});

Horario.belongsToMany(Dias, {
  through: Dia_Horario,
  primaryKey: true,
  allowNull: false,
  foreignKey: {
    name: "fk_horario",
  },
});

Dias.belongsToMany(Horario, {
  through: Dia_Horario,
  primaryKey: true,
  allowNull: false,
  foreignKey: {
    name: "fk_dias",
  },
});

Dias.hasMany(Dia_Horario, {
  foreignKey: {
    name: "fk_dias",
    allowNull: false,
  },
});
Dia_Horario.belongsTo(Dias, {
  foreignKey: {
    name: "fk_dias",
    allowNull: false,
  },
});
//
Horario.hasMany(Dia_Horario, {
  foreignKey: {
    name: "fk_horario",
    allowNull: false,
  },
});
Dia_Horario.belongsTo(Horario, {
  foreignKey: {
    name: "fk_horario",
    allowNull: false,
  },
});

module.exports = Horario;

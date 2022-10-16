const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const Registro = require("./Registro");

const Tipo_Registro = sq.define(
  "Tipo_Registro",
  {
    id_tipo_registro: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER(3),
    },
    nombre: {
      allowNull: false,
      validate: { min: 3, max: 100 },
      type: DataTypes.STRING(100),
    },
  },
  { freezeTableName: true, timestamps: false }
);

Tipo_Registro.hasMany(Registro, {
  foreignKey: {
    allowNull: false,
    name: "fk_tpregistro_registro",
  },
  sourceKey: "id_tipo_registro",
});

Registro.belongsTo(Tipo_Registro, {
  foreignKey: {
    name: "fk_tpregistro_registro",
    allowNull: false,
  },
  targetKey: "id_tipo_registro",
});

module.exports = Tipo_Registro;

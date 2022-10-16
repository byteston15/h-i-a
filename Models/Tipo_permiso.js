const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const Permiso = require("./Permiso");

const Tipo_permiso = sq.define(
  "Tipo_permiso",
  {
    id_tipop: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [3, 100],
          msg: "El nombre del tipo de permiso debe tener al menos 3 caracteres",
        },
      },
      set(val) {
        this.setDataValue("name", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true, timestamps: false }
);

Tipo_permiso.hasMany(Permiso, {
  foreignKey: {
    name: "fk_tipopermiso_permiso",
    allowNull: false,
  },
  sourceKey: "id_tipop",
});

Permiso.belongsTo(Tipo_permiso, {
  foreignKey: {
    name: "fk_tipopermiso_permiso",
    allowNull: false,
  },
  targetKey: "id_tipop",
});

module.exports = Tipo_permiso;

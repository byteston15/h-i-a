const sq = require("../Config/db.js");
const { DataTypes } = require("sequelize");
const Usuario = require("./Usuario");

const Sucursal = sq.define(
  "Sucursal",
  {
    id_sucursal: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
    },
    localizacion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "SIN ESPECIFICAR", //después configura
    },
    direccion: {
      type: DataTypes.STRING(300),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [8, 300],
          msg: "La dirección debe tener 5 a 300 caracteres",
        },
      },
      set(val) {
        this.setDataValue("direccion", val.toUpperCase());
      },
    },
  },
  { freezeTableName: true, paranoid: true }
);

Sucursal.hasMany(Usuario, {
  foreignKey: {
    name: "fk_sucursal_usuario",
    allowNull: false,
  },
  sourceKey: "id_sucursal",
});

Usuario.belongsTo(Sucursal, {
  foreignKey: {
    name: "fk_sucursal_usuario",
    allowNull: false,
  },
  sourceKey: "id_sucursal",
});

module.exports = Sucursal;

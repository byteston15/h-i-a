const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const { encriptPass } = require("../Utils/passHelp");

const Usuario = sq.define(
  "Usuario",
  {
    rut: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      validate: {
        len: {
          args: [8, 9],
          msg: "Rut debe tener 8 a 9 caracteres",
        },
      },
    },
    correo: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        is: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
      },
    },
    ap_paterno: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    ap_materno: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING(300),
      allowNull: false,
      set(val) {
        this.setDataValue("pass", encriptPass(val));
      },
    },
    huella: {
      type: DataTypes.STRING(300),
      allowNull: true,
      defaultValue: "SIN REGISTRO",
    },
    role: {
      type: DataTypes.ENUM,
      values: ["TOOR", "USER", "ADMIN"],
    },
  },
  { freezeTableName: true, paranoid: true }
);

module.exports = Usuario;

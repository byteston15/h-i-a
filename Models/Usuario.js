const sq = require("../Config/db");
const { DataTypes } = require("sequelize");
const encriptPass = require("../Utils/passHelp");
const Registro = require("./Registro");
const Permiso = require("./Permiso");

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
      set(val) {
        this.setDataValue("rut", val.toUpperCase());
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
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      set(val) {
        this.setDataValue("nombre", val.toUpperCase());
      },
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

Usuario.hasMany(Registro, {
  foreignKey: {
    name: "fk_user_registro",
    allowNull: false,
  },
  sourceKey: "rut",
});

Registro.belongsTo(Usuario, {
  foreignKey: {
    name: "fk_user_registro",
    allowNull: false,
  },
  targetKey: "rut",
});

Usuario.hasMany(Permiso, {
  foreignKey: {
    name: "fk_solicitante",
    allowNull: false,
  },
  sourceKey: "rut",
});

Usuario.hasMany(Permiso, {
  foreignKey: {
    name: "fk_autoriza",
    allowNull: true,
    defaultValue: null,
  },
  sourceKey: "rut",
});

Permiso.belongsTo(Usuario, {
  foreignKey: {
    name: "fk_autoriza",
    allowNull: true,
    defaultValue: null,
  },
  targetKey: "rut",
});

Permiso.belongsTo(Usuario, {
  foreignKey: {
    name: "fk_solicitante",
    allowNull: false,
  },
  targetKey: "rut",
});

module.exports = Usuario;

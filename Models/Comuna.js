const sq = require("../Config/db.js")
const {DataTypes} =  require("sequelize") 
const Sucursal = require("./Sucursal.js")

const Comuna = sq.define("Comuna", {
    id_comuna : {
        type : DataTypes.INTEGER(3),
        autoIncrement : true,
        primaryKey: true,
        allowNull : false
    },
    nombre : {
        type : DataTypes.STRING(150),
        allowNull : true
    }
}, {freezeTableName : true})

Comuna.hasMany(Sucursal,{
       foreignKey : 'fk_comuna_sucursal',
        sourceKey : 'id_comuna',
        allowNull : false
})

Sucursal.belongsTo(Comuna, {
        foreignKey : 'fk_comuna_sucursal',
        targetKey : 'id_comuna',
        allowNull : false
})


module.exports = Comuna;




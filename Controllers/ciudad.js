const Ciudad = require("../Models/Ciudad.js")
const Comuna = require("../Models/Comuna.js")
const colors = require("colors")

exports.getCiudades = async(req, res, next) => {
    try{
        const ciudad = await Ciudad.findAll()
        res.status(200).json({
            sucess : true,
            len : ciudad.length,
            data : {
                ciudad
            }
        })
    }catch(err){
        console.log(err.stack.underline.red)
        res.status(500).json({
            success : false,
            error : err.message
        })
    }
}


exports.getComunaByCiudad = async(req, res, next) => {
    try{
        const comunas = await Comuna.findAll({where : {fk_ciudad_comuna : req.params.id}})
        if(!comunas) {return res.status(404).json({succes : false, data : {error : "No data avaible"}})}
        res.status(200).json({
            success : true, 
            len : comunas.length,
            data  : {
                comunas
            }
        })
    }catch(err){
        console.log(err.stack.underline.red)
        res.status(500).json({
            success: false,
            error : err.message
        })
    }
}
    

const Sucursal = require("../Models/Sucursal.js")
const colors = require("colors")


exports.createSucursal = async(req, res, next) => {
    try{
        const sucursal = await Sucursal.create(req.body)
        res.status(201).json({
            success : true,
            length : sucursal.length, 
            data : {
                created : req.body
            }
        })
    }catch(err){
        console.log(err.stack.underline.red)
        res.status(400).json({
            success : false, 
            data : {
                error : err.message
            }
        })
    }
}

exports.listSucursales = async(req, res, next) => {
    try{
        const sucursales = await Sucursal.findAll()
        if(!sucursales){ 
            return res.status(404).json({
                success : true, error : 'no data'
            })
        }
        res.status(200).json({
            success : true,
            length : sucursales.length, 
            data : {
                sucursales
            }
        })
    }catch(err){
        console.log(err.stack.underline.red)
       res.status(500).json({success : false, data : {error : err.message}})
    }
}
exports.updateSucursal = async (req, res, next) => {
  try {
    const sucursal = await Sucursal.update(req.body, {
      where: { id_sucursal: req.params.id },
    });
    if (!sucursal) {
      return res.status(404).json({
        success: false,
        error: "No data",
      });
    }
    res.status(200).json({
      success: true,
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


exports.deleteSucursal = async(req, res, next) => {
    try{
        const sucursal = await Sucursal.destroy({where : { id_sucursal : req.params.id }})
        if(!sucursal){
            return res.status(404).json({success : true, data : {
                error : 'No data founded'
            }})
        }
        res.status(200).json({success : true})
    }catch(err){
        console.log(err.stack.underline.red)
        res.status(500).json({
            success : false,
            data : {
                error : err.message
            }
        })
    }
}




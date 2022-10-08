const sq = require("../Config/db.js");
const colors = require("colors");
const Comuna = require("../Models/Comuna.js");
const Sucursal = require("../Models/Sucursal.js");

exports.getComunas = async (req, res, next) => {
  try {
    const comunas = await Comuna.findAll();
    res.status(200).json({
      success: true,
      len: comunas.length,
      data: {
        comunas,
      },
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

exports.getSucursalByComuna = async (req, res, next) => {
  try {
    const sucursal = await Sucursal.findAll({
      where: { fk_comuna_sucursal: req.params.id },
    });
    if (!sucursal) {
      return res.status(404).json({
        success: true,
        data: {
          error: "no data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: sucursal.length,
      data: {
        sucursal,
      },
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

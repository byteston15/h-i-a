const Tipo_registro = require("../Models/Tipo_registro");
const colors = require("colors");

exports.getTipo_Registro = async (req, res, next) => {
  try {
    const tr = await Tipo_registro.findAll();
    res.status(200).json({
      success: true,
      len: tr.length,
      data: {
        tr,
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

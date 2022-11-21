const Tipo_registro = require("../Models/Tipo_registro");

exports.getTipo_Registro = async (req, res, next) => {
  try {
    const tp = await Tipo_registro.findAll();
    res.status(200).json({
      success: true,
      data: {
        tp,
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

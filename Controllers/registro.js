const Registro = require("../Models/Registro");
const sq = require("../Config/db");

exports.createRegistro = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const registro = await Horario.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          registro: req.body,
        },
      });
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

exports.getRegistros = async (req, res, next) => {
  try {
    //filter by date range and type register
    const registro = await Registro.findAll();
    if (!registro) {
      return res.status(404).json({
        success: true,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: registro.length,
      data: {
        registro,
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

exports.updateRegistro = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const registro = await registro.update(req.params.id, {
        where: { id_registro: req.params.id },
      });
      if (!registro) {
        return res
          .status(404)
          .json({ success: false, data: { error: "No data" } });
      }
      res.status(200).json({
        success: true,
        data: {
          registro: req.body,
        },
      });
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

exports.deleteRegistro = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const registro = await Registro.destroy({
        where: { id_registro: req.params.id },
      });
      if (!registro) {
        return res.status(404).json({
          success: false,
          data: {
            error: "no data",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {
          registro: {},
        },
      });
      return registro;
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

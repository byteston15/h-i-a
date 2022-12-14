const Dia_Horario = require("../Models/Dia_Horario");
const colors = require("colors");
const sq = require("../Config/db");

exports.createHorario = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const horario = await Dia_Horario.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          horario: req.body,
        },
      });
      return horario;
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

exports.getHorarios = async (req, res, next) => {
  try {
    const horario = await Dia_Horario.findAll();
    if (!horario) {
      return res.status(404).json({
        success: true,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: horario.length,
      data: {
        horario,
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

exports.updateHorario = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const horario = await Dia_Horario.update(req.body, {
        where: { fk_horario: req.params.idhorario, fk_dias: req.params.dia },
      });
      if (!horario) {
        return res
          .status(404)
          .json({ success: true, data: { error: "No data" } });
      }
      res.status(200).json({
        success: true,
        data: {
          horario: req.body,
        },
      });
      return horario;
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

exports.deleteHorario = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const horario = await Dia_Horario.destroy({
        where: { fk_horario: req.params.idhorario, fk_dias: req.params.dia },
      });
      if (!horario) {
        return res.status(404).json({
          success: true,
          data: {
            error: "no data",
          },
        });
      }
      res.status(200).json({
        success: true,
        data: {
          horario: {},
        },
      });
      return horario;
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

const Horario = require("../Models/Horario");
const colors = require("colors");
const sq = require("../Config/db");

exports.createHorario = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const horario = await Horario.create(req.body);
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
    const horario = await Horario.findAll();
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
      const horario = await Horario.update(req.body, {
        where: { id_horario: req.params.id },
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
      const horario = await Horario.destroy({
        where: { id_horario: req.params.id },
      });
      if (!horario) {
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
          horario: {},
        },
      });
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

const Horario = require("../Models/Horario");
const colors = require("colors");
const sq = require("../Config/db");
const Dia_Horario = require("../Models/Dia_Horario");
const Dias = require("../Models/Dias");

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

exports.getFullHorario = async (req, res, next) => {
  try {
    let whereObj;
    if (req.query.horario) {
      whereObj = {
        fk_horario: req.query.horario,
      };
    }
    const h1 = await Dia_Horario.findAll({
      where: whereObj,
      attributes: [
        "ingreso",
        "salida",
        "tiempo_colacion",
        "tiempo_espera",
        "tiempo_salida",
      ],
      include: [
        { model: Horario, attributes: ["id_horario", "nombre"] },
        { model: Dias, attributes: ["nombre"] },
      ],
    });
    res.status(200).json({
      success: true,
      legnth: h1.length,
      data: {
        h1,
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

exports.getHorarios = async (req, res, next) => {
  try {
    const h1 = await Horario.findAll();
    if (!h1) {
      return res.status(404).json({
        success: false,
        data: {
          error: "no data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: h1.length,
      data: {
        h1,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

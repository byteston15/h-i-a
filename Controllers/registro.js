const Registro = require("../Models/Registro");
const sq = require("../Config/db");

exports.createRegistro = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const registro = await Horario.create(req.body);
    await t.commit();
    res.status(201).json({
      success: true,
      data: {
        registro: req.body,
      },
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    await t.rollback();
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
    const t = sq.transaction();
    const registro = await registro.update(req.params.id, {
      where: { id_registro: req.params.id },
    });
    if (!registro) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, data: { error: "No data" } });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: {
        registro: req.body,
      },
    });
  } catch (err) {
    await t.rollback();
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
    const t = sq.transaction();
    const registro = await Registro.destroy({
      where: { id_registro: req.params.id },
    });
    if (!registro) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        data: {
          error: "no data",
        },
      });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: {
        registro: {},
      },
    });
  } catch (err) {
    await t.rollback();
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

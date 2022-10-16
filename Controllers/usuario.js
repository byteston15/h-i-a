const Usuario = require("../Models/Usuario.js");
const colors = require("colors");
const sq = require("../Config/db");

exports.createUser = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const user = await Usuario.create(req.body);
    await t.commit();
    res.status(201).json({
      sucess: true,
      data: {
        created: req.body,
      },
    });
  } catch (err) {
    console.log(err.stack);
    await t.rollback();
    res.status(500).json({
      sucess: true,
      data: {
        error: err.message,
      },
    });
  }
};

exports.listUsers = async (req, res, next) => {
  try {
    const usuario = await Usuario.findAll();
    if (!usuario) {
      return res.status(404).json({
        success: false,
        error: "no data",
      });
    }
    res.status(200).json({
      success: true,
      length: usuario.length,
      data: {
        usuario,
      },
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const user = await Usuario.update(req.body, {
      where: { rut: req.params.id },
    });
    if (!user) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        error: "No data",
      });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: req.body,
    });
  } catch (err) {
    console.log(err.stack);
    await t.rollback();
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteUsuario = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const user = await Usuario.destroy({
      where: { rut: req.params.id },
    });
    if (!user) {
      await t.rollback();
      return res.status(404).json({
        success: true,
        data: {
          error: "No data",
        },
      });
    }

    res.status(200).json({ success: true });
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

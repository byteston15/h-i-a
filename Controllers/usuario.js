const Usuario = require("../Models/Usuario.js");
const colors = require("colors");
const sq = require("../Config/db");

exports.createUser = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const user = await Usuario.create(req.body);
      res.status(201).json({
        sucess: true,
        data: {
          created: req.body,
        },
      });
      return user;
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      sucess: true,
      data: {
        error: err.message,
      },
    });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const u1 = await Usuario.findOne({
      where: {
        rut: req.params.id,
      },
    });
    if (!u1) {
      return res.status(404).json({
        success: false,
        data: {
          error: {
            message: "no data",
          },
        },
      });
    }
    res.status(200).json({
      success: true,
      data: {
        u1,
      },
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: {
          message: err.message,
        },
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
    const t = sq.transaction(async (t) => {
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
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return user;
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteUsuario = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const user = await Usuario.desbarratroy({
        where: { rut: req.params.id },
      });
      if (!user) {
        return res.status(404).json({
          success: true,
          data: {
            error: "No data",
          },
        });
      }
      res.status(200).json({ success: true });
      return user;
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

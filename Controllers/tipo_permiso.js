const Tipo_permiso = require("../Models/Tipo_permiso");
const Permiso = require("../Models/Permiso");
const colors = require("colors");
const sq = require("../Config/db");
const { json, where } = require("sequelize");

exports.createTpermiso = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const tpermiso = await Tipo_permiso.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          tipo_permiso: req.body,
        },
      });
      return tpermiso;
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

exports.getTpermisos = async (req, res, next) => {
  try {
    const tpermiso = await Tipo_permiso.findAll();
    if (!tpermiso) {
      return res.status(404).json({
        success: false,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: tpermiso.length,
      data: {
        tpermiso,
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

exports.updateTpermiso = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const tpermiso = await Tipo_permiso.update(req.body, {
        where: { id_tipop: req.params.id },
      });
      if (!tpermiso) {
        return res
          .status(404)
          .json({ success: false, data: { error: "No data" } });
      }
      res.status(200).json({
        success: true,
        update: req.body,
      });

      return tpermiso;
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

exports.deleteTpermiso = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const tpermiso = await Tipo_permiso.destroy({
        where: { id_tipop: req.params.id },
      });
      if (!tpermiso) {
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

exports.getPermisos = async (req, res, next) => {
  try {
    let whereObj = {
      where: {
        fk_tipopermiso_permiso: req.params.id,
      },
    };
    const p1 = await Permiso.findAll(whereObj);
    res.status(200).json({
      success: true,
      length: p1.length,
      data: {
        p1,
      },
    });
  } catch (err) {}
};

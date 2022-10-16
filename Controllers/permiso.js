const Permiso = require("../Models/Registro");
const sq = require("../Config/db");

exports.createPermiso = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const permiso = await Permiso.create(req.body);
    await t.commit();
    res.status(201).json({
      success: true,
      data: {
        permiso: req.body,
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

exports.getPermisos = async (req, res, next) => {
  try {
    //filter by date range and type register
    const permiso = await Permiso.findAll();
    if (!permiso) {
      return res.status(404).json({
        success: true,
        data: {
          error: "No data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: permiso.length,
      data: {
        permiso,
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

exports.updatePermiso = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const permiso = await Permiso.update(req.params.id, {
      where: { id_permiso: req.params.id },
    });
    if (!permiso) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, data: { error: "No data" } });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      data: {
        permiso: req.body,
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

exports.deletePermiso = async (req, res, next) => {
  try {
    const t = sq.transaction();
    const permiso = await Permiso.destroy({
      where: { id_permiso: req.params.id },
    });
    if (!permiso) {
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
        permiso: {},
      },
    });
  } catch (err) {
    await t.rollback();
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

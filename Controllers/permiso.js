const Permiso = require("../Models/Permiso");
const sq = require("../Config/db");

exports.createPermiso = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const permiso = await Permiso.create(req.body);
      res.status(201).json({
        success: true,
        data: {
          permiso: req.body,
        },
      });
      return permiso;
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
    const t = sq.transaction(async (t) => {
      const permiso = await Permiso.update(req.body, {
        where: { id_permiso: req.params.id },
      });
      if (!permiso) {
        return res.status(404).json({
          success: false,
          error: "No data",
        });
      }
      res.status(200).json({
        success: true,
        data: req.body,
      });
      return permiso;
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deletePermiso = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const permiso = await Permiso.destroy({
        where: { id_permiso: req.params.id },
      });
      if (!permiso) {
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
          permiso: {},
        },
      });
      return permiso;
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

exports.getDocumentBypermiso = async (req, res, next) => {};

const Permiso = require("../Models/Permiso");
const sq = require("../Config/db");
const Usuario = require("../Models/Usuario");
const Tipo_permiso = require("../Models/Tipo_permiso");
const { Op } = require("sequelize");
const colors = require("colors");
const Documento = require("../Models/Documento");
const path = require("node:path");

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

exports.getPermisos = async (req, res, next) => {
  try {
    let dateWhere = {};
    let typeWhere = {};
    if (req.query.start || req.query.end) {
      dateWhere = {
        [Op.or]: [
          {
            comienzo: { [Op.between]: [req.query.start, req.query.end] },
          },
          {
            termino: { [Op.between]: [req.query.start, req.query.end] },
          },
        ],
      };
    }
    if (req.query.type) {
      typeWhere = { fk_tipopermiso_permiso: req.query.type };
    }
    const queryVal = Object.assign(dateWhere, typeWhere);
    const permisos = await Permiso.findAll({
      where: queryVal,
      attributes: ["id_permiso", "comienzo", "termino", "comentario", "estado"],
      include: [
        { model: Tipo_permiso, attributes: ["name", "id_tipop"] },
        { model: Usuario, attributes: ["nombre"] },
        { model: Documento, attributes: ["id_doc", "ruta"] },
      ],
    });
    if (!permisos) {
      return res.status(404).json({
        success: false,
        data: {
          error: "no data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: permisos.length,
      data: {
        permisos,
      },
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

exports.getDocumentBypermiso = async (req, res, next) => {
  try {
    let options = {
      root: path.join(__dirname, "..", "Public", "images"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now,
        "x-sent": true,
      },
    };
    if (!req.query.iddoc) {
      return res.status(400).json({
        success: false,
        data: {
          error: {
            message: "Debes entregar el req.query.iddoc",
          },
        },
      });
    }
    const documentos = await Documento.findAll({
      where: {
        fk_permiso: req.params.id,
        id_doc: req.query.iddoc,
      },
    });

    if (documentos.length == 0) {
      return res.status(404).json({
        success: false,
        data: {
          error: "no data",
        },
      });
    }
    let fileName = documentos[0]["dataValues"]["ruta"]
      .split("/")
      .slice(-1)
      .toString();

    console.log(fileName);
    res.status(200).sendFile(fileName, options, (err) => {
      if (err) {
        next(err);
      } else {
        console.log("sent: ", documentos[0]);
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
};

const Documento = require("../Models/Documento");
const colors = require("colors");

exports.createDocumento = async (req, res, next) => {
  try {
    const documento = await Documento.create(req.body);
    res.status(201).json({
      success: true,
      data: {
        documento: req.body,
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

exports.updateDocumento = async (req, res, next) => {
  try {
    const documento = await Documento.update(req.params.id, {
      where: { id_doc: req.params.id },
    });
    if (!documento) {
      return res
        .status(404)
        .json({ success: true, data: { error: "No data" } });
    }
    res.status(200).json({
      success: true,
      data: {
        documento: req.body,
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

exports.deleteDocumento = async (req, res, next) => {
  try {
    const documento = await Documento.destroy({
      where: { id_doc: req.params.id },
    });
    if (!documento) {
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
        documento: {},
      },
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

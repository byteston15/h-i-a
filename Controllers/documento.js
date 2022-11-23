const Documento = require("../Models/Documento");
const colors = require("colors");
const sq = require("../Config/db");
const fs = require("fs");

exports.deleteDocumento = async (req, res, next) => {
  try {
    const t = sq.transaction(async (t) => {
      const d1 = await Documento.findOne({ where: { id_doc: req.params.id } });
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
      const deleteDocument = await fs.rm(d1.ruta, (cb, err) => {
        if (err) {
          return err.message;
        }
        return "Deleted Succesfully";
      });

      return documento;
    });
  } catch (err) {
    console.log(err.stack.underline.red);
    res.status(500).json({ success: false, data: { error: err.message } });
  }
};

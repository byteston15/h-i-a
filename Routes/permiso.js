const express = require("express");
const sq = require("../Config/db");
const Documento = require("../Models/Documento");
const multer = require("multer");

const router = express.Router();
const {
  createPermiso,
  deletePermiso,
  updatePermiso,
  getDocumentoByPermiso, //id por documentos
} = require("../Controllers/permiso");

const { deleteDocumento } = require("../Controllers/documento");

router.route("/permisos").post(createPermiso);
router.route("/permisos/:id").delete(deletePermiso).put(updatePermiso);

//files
let storage = multer.diskStorage({
  destination: "Public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Files routes
router
  .route("/permisos/:id/documento")
  .delete(deleteDocumento)
  .post(upload.single("document"), async (req, res, next) => {
    try {
      const t = sq.transaction(async (t) => {
        const documento = await Documento.create({
          ruta: `${req.file.destination}/${req.file.filename}`,
          fk_permiso: req.params.id,
        });
        res.status(201).json({
          success: true,
          data: {
            created: documento,
          },
        });
        return documento;
      });
    } catch (err) {
      console.log(err.stack);
      res.status(401).json({
        success: false,
        data: {
          error: {
            message: err.message,
          },
        },
      });
    }
  })
  .get();

router.route("/permisos/documento/:iddoc").delete(deleteDocumento);
module.exports = router;

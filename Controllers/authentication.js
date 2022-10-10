const sq = require("../Config/db");
const Usuario = require("../Models/Usuario");

exports.createUser = async (req, res, next) => {
  try {
    const t = await sq.transaction();
    const u1 = await Usuario.findOne(req.body.correo);
    if (u1) {
      return res.status(400).json({
        success: false,
        data: {
          error: "El correo ya existe!",
        },
      });
    }
    const u2 = await Usuario.create(req.body);
    await t.commit();
    res.status(201).json({
      success: true,
      data: {
        created: u2,
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

const Usuario = require("../Models/Usuario");
const Permiso = require("../Models/Permiso");
const Horario = require("../Models/Horario");
const Dia_Horario = require("../Models/Dia_Horario");

const sq = require("../Config/db");
const { Op, where } = require("sequelize");
const Registro = require("../Models/Registro");

exports.getReporteUsuario = async (req, res, next) => {
  try {
    let whereObj = {};
    if (req.query.rut) {
      whereObj = {
        rut: req.query.rut,
      };
    }
    console.log(req.query.start, req.query.end);
    const report = await Usuario.findAll({
      where: whereObj,
      order: ["fk_sucursal_usuario"],
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
        include: [
          [
            sq.literal(
              `(
          select COUNT(*) 
                      from Permiso
                      where  
                      Permiso.comienzo <= "${req.query.start} 00:00:00" OR Permiso.comienzo <= "${req.query.end}"
                      AND Permiso.termino >= "${req.query.start} 00:00:00"
                      and
                      Permiso.fk_solicitante = Usuario.rut
                      and
                      Permiso.fk_tipopermiso_permiso = 1
              )`
            ),
            "Cantidad permisos",
          ],
          [
            sq.literal(`(
              SELECT COUNT(*)
                FROM Permiso
                WHERE 
                Permiso.comienzo <= "${req.query.start} 00:00:00" OR Permiso.comienzo <= "${req.query.end}"
                AND Permiso.termino >= "${req.query.start} 00:00:00"
                AND
                Permiso.fk_solicitante = Usuario.rut
                and
                Permiso.fk_tipopermiso_permiso = 2
            )`),
            "Cantidad vacaciones",
          ],
          [
            sq.literal(`(
               SELECT COUNT(*)
                FROM Permiso
                WHERE 
                Permiso.comienzo <= "${req.query.start} 00:00:00" OR Permiso.comienzo <= "${req.query.end}"
                AND Permiso.termino >= "${req.query.start} 00:00:00"
                AND
                Permiso.fk_solicitante = Usuario.rut
                and
                Permiso.fk_tipopermiso_permiso = 3
            )`),
            "Cantidad licencia",
          ],
          [
            sq.literal(`(
              select round(SUM(TIME_TO_SEC(TIMEDIFF(time(r.registro), dh.ingreso))/60))
              from Registro r 
              join Dia_Horario dh 
              on Usuario.fk_horario_usuario = dh.fk_horario 
              where r.deletedAt is NULL
              AND Usuario.deletedAt  is NULL
              and dh.deletedAt is null
              and time(r.registro) > dh.ingreso
              and Usuario.fk_horario_usuario  = dh.fk_horario 
              and r.fk_user_registro = Usuario.rut
              and dh.fk_dias  =  DAYOFWEEK(r.registro)
              and r.fk_tpregistro_registro = 1
              and r.registro BETWEEN "${req.query.start} 00:00:00" and "${req.query.end} 00:00:00"
            )            `),
            "Minutos de atraso",
          ],
          [
            sq.literal(`(
              select round(SUM(TIME_TO_SEC(TIMEDIFF(time(r.registro), dh.salida))/60))
              from Registro r 
              join Dia_Horario dh 
              on Usuario.fk_horario_usuario = dh.fk_horario 
              where r.deletedAt is NULL
              AND Usuario.deletedAt  is NULL
              and dh.deletedAt is null
              and time(r.registro) > dh.salida
              and Usuario.fk_horario_usuario  = dh.fk_horario 
              and r.fk_user_registro = Usuario.rut
              and dh.fk_dias  =  DAYOFWEEK(r.registro)
              and r.fk_tpregistro_registro = 2
              and r.registro BETWEEN "${req.query.start} 00:00:00" and "${req.query.end} 00:00:00" 
            )`),
            "Minutos extras",
          ],
        ],
      },
    });
    if (!report) {
      return res.status(404).json({
        success: false,
        data: {
          error: "no data",
        },
      });
    }
    res.status(200).json({
      success: true,
      length: report.length,
      data: {
        report,
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

exports.getReportePermisosByUser = async (req, res, next) => {
  try {
    let whereObj = {};
    if (!req.query.type) {
      return res.status(400).json({
        success: false,
        data: {
          error: "Debes entregar el query de type",
        },
      });
    }
    whereObj = {
      fk_tipopermiso_permiso: req.query.type,
      fk_solicitante: req.params.id,
      [Op.or]: [
        {
          comienzo: {
            [Op.lte]: req.query.start,
          },
        },
        {
          comienzo: {
            [Op.lte]: req.query.end,
          },
        },
      ],
      [Op.and]: [
        {
          termino: {
            [Op.gte]: req.query.start,
          },
        },
      ],
    };
    const reporte = await Permiso.findAll({
      attributes: [
        "id_permiso",
        "comienzo",
        "termino",
        "comentario",
        "estado",
        "fk_solicitante",
        "fk_autoriza",
      ],
      where: whereObj,
      include: [{ model: Usuario, attributes: ["rut", "nombre"] }],
    });
    if (!reporte) {
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
        reporte,
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

exports.getAtrasosByuser = async (req, res, next) => {
  try {
    let whereObj = {};
    //Validar si no hay querys

    whereObj = {
      "$Dia_Horario.ingreso": {
        [Op.gt]: "$Registro.registro".split(" ")[1],
      },
    };
    const reporte = await Registro.findAll({
      where: whereObj,
      attributes: {
        exclude: ["createdAt", "deletedAt", "updatedAt"],
      },
      include: [
        {
          model: Usuario,
          attributes: ["rut", "nombre"],
          include: {
            model: Horario,
            attributes: ["id_horario"],
            include: {
              model: Dia_Horario,
              attributes: ["ingreso", "salida"],
            },
          },
        },
      ],
    });
    if (!reporte) {
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
        reporte,
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

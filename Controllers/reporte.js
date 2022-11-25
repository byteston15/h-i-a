const Usuario = require("../Models/Usuario");
const Horario = require("../Models/Horario");
const Dia_Horario = require("../Models/Dia_Horario");
const Registro = require("../Models/Registro");
const Sucursal = require("../Models/Sucursal");
const Permiso = require("../Models/Permiso");
const Tipo_permiso = require("../Models/Tipo_permiso");
const sq = require("../Config/db");

exports.getReporteUsuario = async (req, res, next) => {
  try {
    console.log(req.query.start, req.query.end);
    const report = await Usuario.findAll({
      attributes: {
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
                      Permiso.fk_tipopermiso_permiso = ${req.query.permiso}
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
                Permiso.fk_tipopermiso_permiso = ${req.query.vacacion}
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
                Permiso.fk_tipopermiso_permiso = ${req.query.licencia}
            )`),
            "Cantidad licencia",
          ],
          [
            sq.literal(`(
              
            )`),
          ],
        ],
      },
    });
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

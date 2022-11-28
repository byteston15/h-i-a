const Usuario = require("../Models/Usuario");
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
              select round(SUM(TIME_TO_SEC(TIMEDIFF(time(r.registro), dh.ingreso))/60)) as 'Minutos de atrasos' 
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
            "Minutos hora",
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

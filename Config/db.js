const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./Config/config.env" });

const sq = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  host: process.env.HOST,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATATIME") {
        return field.string();
      }
      return next();
    },
  },
  timezone: "-03:00",
});

module.exports = sq;

const bcrypt = require("bcrypt");

const encriptPass = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

module.exports = encriptPass;

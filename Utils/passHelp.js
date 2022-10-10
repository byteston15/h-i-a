const bcrypt = require("bcrypt");

const encriptPass = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pas, salt);
  return hash;
};

module.exports = encriptPass;

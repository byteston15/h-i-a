const express = require("express");
const router = express.Router();
const Dias = require("../Models/Dias");

router.route("/dias").get(async (req, res, next) => {
  try {
    const dias = await Dias.findAll();
    res.status(200).json({
      success: true,
      len: dias.length,
      data: {
        dias,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      data: {
        error: err.message,
      },
    });
  }
});

module.exports = router;

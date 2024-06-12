const Paint = require("../models/paint");

exports.addPaint = (req, res, next) => {
  res.status(201).json({
    message: "addPaint",
  });
};

exports.getAllPaints = (req, res, next) => {
  res.status(201).json({
    message: "getAllPaints",
  });
};

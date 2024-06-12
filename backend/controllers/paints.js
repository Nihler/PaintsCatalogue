const Paint = require("../models/paint");

exports.addPaint = (req, res, next) => {
  console.log(req.body);
  const paint = new Paint({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    type: req.body.type,
    color: req.body.color,
    status: req.body.status,
  });
  paint.save().then((result) => {
    res.status(201).json({
      message: "addPaint",
    });
  });
};

exports.getAllPaints = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const paintQuery = Paint.find();
  let fetchedPaints;
  if (pageSize && currentPage) {
    paintQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  paintQuery
    .then((docs) => {
      fetchedPaints = docs;
      return Paint.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "Paints fetched succesfully!",
        paints: fetchedPaints,
        maxArticles: count,
      });
    });
};

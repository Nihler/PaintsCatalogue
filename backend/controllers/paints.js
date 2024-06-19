const paint = require("../models/paint");
const Paint = require("../models/paint");
const User = require("../models/user");

exports.addPaint = (req, res, next) => {
  console.log(req.body);
  const paint = new Paint({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    type: req.body.type,
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

exports.addPaintToInventory = (req, res, next) => {
  const userId = req.userData.userId;
  const paintId = req.body.paintId;
  Paint.findById(paintId)
    .then((paintEl) => {
      User.findById(userId).then((userEl) => {
        //check if paint is already in user inventory. based on that either add or remove
        const index = userEl.inventory.find((paint) =>
          paint._id.equals(paintEl._id)
        );
        if (index) {
          userEl.inventory.pull(paintEl);
          userEl.save().then(() => {
            res.status(200).json({
              message: "Paint Removed",
            });
          });
        } else {
          userEl.inventory.push(paintEl);
          userEl.save().then(() => {
            res.status(200).json({
              message: "Paint Added",
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

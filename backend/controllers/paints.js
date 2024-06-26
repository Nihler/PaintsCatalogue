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
  const paintQuery = Paint.find();
  let fetchedPaints;
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

exports.getUserPaints = (req, res, next) => {
  let userId = req.params.userId;
  User.findOne({ username: userId })
    .then((userEl) => {
      res.status(200).json({
        message: "Paints fetched succesfully",
        paints: userEl.inventory,
        userId: userId,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
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

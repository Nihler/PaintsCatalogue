const paint = require("../models/paint");
const Paint = require("../models/paint");
const User = require("../models/user");

exports.addPaint = (req, res, next) => {
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
        id: userEl._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};

exports.getUserWishlist = (req, res, next) => {
  let userId = req.params.userId;
  User.findOne({ username: userId })
    .then((userEl) => {
      res.status(200).json({
        message: "Wishlist fetched succesfully",
        paints: userEl.wishlist,
        id: userEl._id,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err,
      });
    });
};

exports.addPaintToUser = (req, res, next) => {
  const userId = req.userData.userId;
  const paintId = req.body.paintId;
  const mode = req.body.mode;
  let query;

  Paint.findById(paintId)
    .then((paintEl) => {
      User.findById(userId).then((userEl) => {
        if (mode === undefined || mode === "wishlist") {
          query = userEl.wishlist;
        } else {
          query = userEl.inventory;
        }
        //check if paint is already in user inventory. based on that either add or remove
        const index = query.find((paint) => paint._id.equals(paintEl._id));
        if (index) {
          query.pull(paintEl);
          userEl.save().then(() => {
            res.status(200).json({
              message: "Paint Removed from " + mode,
            });
          });
        } else {
          query.push(paintEl);
          userEl.save().then(() => {
            res.status(200).json({
              message: "Paint Added to " + mode,
            });
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

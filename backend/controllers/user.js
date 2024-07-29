const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
      username: req.body.username,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        throw new Error("User not found");
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        token: token,
        userId: fetchedUser._id,
        expiresIn: 3600,
        username: fetchedUser.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        message: err.message,
      });
    });
};

exports.changePassword = (req, res, next) => {
  const userId = req.userData.userId;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.findOneAndUpdate({ _id: userId }, { password: hash }).then(
        (userEl) => {
          userEl.save();
        }
      );
    })
    .then(() =>
      res.status(200).json({
        message: "Password changed",
      })
    )
    .catch((err) => {
      console.log(err);
    });
};

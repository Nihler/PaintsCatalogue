const express = require("express");

const PaintsController = require("../controllers/paints");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", PaintsController.addPaint);

router.get("", PaintsController.getAllPaints);

router.post("/addToEq", checkAuth, PaintsController.addPaintToUser);

router.get("/getEq/:userId", PaintsController.getUserPaints);

router.get("/getWishlist/:userId", PaintsController.getUserWishlist);

module.exports = router;

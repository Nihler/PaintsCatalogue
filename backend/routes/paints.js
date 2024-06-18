const express = require("express");

const PaintsController = require("../controllers/paints");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", PaintsController.addPaint);

router.get("", PaintsController.getAllPaints);

router.post("/addToEq", checkAuth, PaintsController.addPaintToInventory);

module.exports = router;

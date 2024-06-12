const express = require("express");

const PaintsController = require("../controllers/paints");

const router = express.Router();

router.post("", PaintsController.addPaint);

router.get("", PaintsController.getAllPaints);

module.exports = router;

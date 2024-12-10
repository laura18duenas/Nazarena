const express = require("express");
const router = express.Router();

const {healthCheck} = require("../../app/controllers/health-controller");
router.get("/health", healthCheck);

module.exports = router;
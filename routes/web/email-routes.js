const express = require("express");
const router = express.Router();

const {sendEmail} = require("../../app/controllers/email-controller");
router.post("/send-email", sendEmail);

module.exports = router;
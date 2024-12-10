const express = require("express");
const router = express.Router();

const {
    getHome,
    setForm,
    getDocument,
    getAbout,
    getServices,
    getContact
} = require("../../app/controllers/page-controller");

router.get("/", getHome);
router.post("/form", setForm);
router.get("/register", getDocument);
router.get("/about", getAbout);
router.get("/services", getServices);
router.get("/contact", getContact);

module.exports = router;
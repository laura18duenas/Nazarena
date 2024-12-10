const express = require("express");
const router = express.Router();

router.use("/", require("./web/email-routes"));
router.use("/", require("./web/health-routes"));
router.use("/", require("./web/page-routes"));

router.use((req, res) => {
    res.status(404).render("error-page/404", {
        layout: "error-page/404",
        path: req.url
    });
});

module.exports = router;
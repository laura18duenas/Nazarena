const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const {job} = require("./jobs/cron");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "resources", "views"));

const router = require("./routes/index");
app.use(router);

app.listen(port, () => console.log("Server running on:", `http://localhost:${port}`));
job.start();

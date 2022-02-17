const express = require("express");
const app = express();
const port = 8000;
const ejs = require("ejs");
const env = require("./config/environment");
// console.log(env.name);
const logger = require("morgan");
require("./config/view-helpers")(app);
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false }));

app.use(express.static(env.asset_path));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(logger(env.morgan.mode, env.morgan.options));

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error while running server.......", err);
  }
  console.log("Server is running on port ", port);
});

module.exports = app;

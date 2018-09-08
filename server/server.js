const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes/api");

require("./config/mongoose");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client/dist"));

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Running on 3000");
});

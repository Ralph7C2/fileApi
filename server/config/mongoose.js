var mongoose = require("mongoose");
const url = "mongodb://localhost:27017/FS2";
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true }
);

module.exports = { mongoose };

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const FSNodeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  pathToActualFile: {
    type: String,
    trim: true
  },
  isDir: {
    type: Boolean,
    required: true
  },
  extension: {
    type: String
  },
  children: {
    type: [ObjectId]
  }
});

var FSNode = mongoose.model("FSNode", FSNodeSchema);
module.exports = { FSNode };

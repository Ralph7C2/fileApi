const router = require("express").Router();
const multer = require("multer");

const { FSNode } = require("../models/FSNode");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

const upload = multer({ storage });

const action = event => {
  const file = event.name;
  alert(`action: ${file}`);
};

router.get("/test", (req, res) => {
  res.json([
    {
      id: "0",
      name: "Folder1",
      children: [{ id: "1", name: "file1" }]
    },
    {
      id: "2",
      name: "Folder2",
      children: []
    }
  ]);
});

async function mapChildren(node, data) {
  promises = node.children.map(async child => {
    console.log(child);
    let file = await FSNode.findById(child);
    console.log(file);
    if (file.isDir) {
      data.children.push({
        id: file._id,
        name: file.name,
        children: []
      });
    } else {
      data.children.push({
        id: file._id,
        name: file.name
      });
    }
  });
  return Promise.all(promises);
}

router.get("/files", async (req, res) => {
  let root = await FSNode.findOne({ name: "root", isDir: true });
  let data = [
    {
      id: root._id,
      name: "root",
      children: []
    }
  ];
  await mapChildren(root, data[0]);
  console.log("Returning");
  res.json(data);
});

router.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.body);

  insertDocument(req, "public/images/uploads/" + req.file.filename, extra => {
    console.log(extra);
    res.json({
      message: "File uploaded successfully",
      extra: extra ? extra.message : ""
    });
  });
});

module.exports = router;

var insertDocument = async function(req, filePath, callback) {
  extRegex = /\..*$/;
  try {
    var ext = req.file.originalname.match(extRegex)[0].slice(1);
  } catch (err) {
    var ext = "none";
  }
  let thisFile = new FSNode({
    name: req.file.originalname,
    isDir: false,
    pathToActualFile: filePath,
    extension: ext
  });
  let saved = await thisFile.save();
  console.log(saved);
  if (req.body.addToDir) {
    try {
      let dir = await FSNode.findOne({
        name: req.body.addToDir,
        isDir: true
      });
      if (dir === null) {
        console.log("Could not find directory");
        let root = await FSNode.findOne({ name: "root" });
        root.children.push(saved._id);
        await root.save();
        return callback(new Error("Could not find directory, added to root"));
      }
      dir.children.push(saved);
      await dir.save();
    } catch (err) {
      console.log(err);
      return callback(err);
    }
  } else {
    let root = await FSNode.findOne({ name: "root" });
    root.children.push(saved._id);
    await root.save();
  }
  console.log(saved);
  return callback(saved);
};

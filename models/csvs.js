const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const CSV_PATH = path.join("/csvFiles");

const csvSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    nameWithDate: {
      type: "String",
      required: true,
    },
    csv_path: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", CSV_PATH));
  },
  filename: function (req, file, cb) {
    // console.log(file);
    let filename = file.originalname.split(".")[0];
    // console.log(filename);
    cb(null, filename + "-" + Date.now());
  },
});

//.single("csvFile") if error occurs try this.
csvSchema.statics.uploadedCsv = multer({ storage: storage }).single("csvFile");
csvSchema.statics.csvPath = CSV_PATH;

const Csv = mongoose.model("Csv", csvSchema);
module.exports = Csv;

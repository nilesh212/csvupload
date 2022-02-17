const CSVFILES = require("../models/csvs");
const fs = require("fs");
const path = require("path");
const csvtojson = require("csvtojson");
const { resourceUsage } = require("process");

module.exports.home = async function (req, res) {
  try {
    let csvFiles = await CSVFILES.find({});
    // console.log(csvFiles);
    return res.render("home", {
      title: "Upload CSV",
      csvFiles: csvFiles,
    });
  } catch (error) {
    console.log("*********************Error on HomePage: ", error);
    return res.render("home");
  }
  return res.render("home");
};

module.exports.uploadCSV = async function (req, res) {
  // console.log(req.body);
  try {
    CSVFILES.uploadedCsv(req, res, function (err) {
      if (err) {
        console.log("*******Multer Error: ", err);
        return res.redirect("back");
      }
      let extension = req.file.originalname.split(".")[1];

      if (extension != "csv") {
        return res.redirect("back");
      }
      CSVFILES.create(
        {
          name: req.file.originalname,
          nameWithDate: req.file.filename,
          csv_path: CSVFILES.csvPath + "/" + req.file.filename,
        },
        function (error, csvFile) {
          if (error) {
            console.log("*******Multer Error while creating csvfile: ", error);
            return res.redirect("back");
          }
          // console.log(req.file);
          // console.log(csvFile);
          return res.redirect("back");
        }
      );
    });
    // console.log(req.file);
    // return res.redirect("back");
  } catch (error) {
    console.log("Error while uploading .csv file...........\n", error);
    return res.redirect("back");
  }
};

module.exports.showCsv = async function (req, res) {
  try {
    let csvData = await fs.readFileSync(
      path.join(__dirname, "../csvFiles", req.query.filename),
      "utf8"
    );
    // console.log(csvData);
    let csvFile = await csvtojson()
      .fromString(csvData)
      .then((json) => {
        return json;
      });
    // console.log(csvFile);
    let i = 0,
      searchBy;
    for (let key in csvFile[0]) {
      searchBy = key;
      i++;
      if (i == 2) {
        break;
      }
    }
    return res.render("show_csvData", {
      title: "CSV DATA",
      csvFile: csvFile,
      searchBy: searchBy,
    });
  } catch (error) {
    console.log("***************Error while showing csv data", error);
    return res.redirect("/");
  }
};

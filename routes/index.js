const express = require("express");

const router = express.Router();

const homeController = require("./../controllers/home_controller");

router.get("/", homeController.home);
router.post("/upload-csv", homeController.uploadCSV);
router.get("/show-csvData", homeController.showCsv);

module.exports = router;

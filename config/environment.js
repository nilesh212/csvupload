const fs = require("fs");
const rfs = require("rotating-file-stream").createStream;
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  db: "uploadcsv_development",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: process.env.CSVUPLOAD_ENVIRONMENT,
  asset_path: process.env.CSVUPLOAD_ASSET_PATH,
  db: process.env.CSVUPLOAD_DB,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

// module.exports = development;

module.exports =
  eval(process.env.CSVUPLOAD_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CSVUPLOAD_ENVIRONMENT);

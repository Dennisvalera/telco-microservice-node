var path = require("path");
const express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");

app.use(cors());

function sendFileContent(filePath, res) {
  try {
    const file = fs.readFileSync(path.join(__dirname, filePath));
    const content = JSON.parse(file);
    res.send(content);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

app.get("/getConfig", (req, res) => {
  const env = req.query["env"];
  const filePath = `/config/${env}/config.json`;
  sendFileContent(filePath, res);
});

app.get("/getConfigI18n", (req, res) => {
  const filePath = `/i18n/config.json`;
  sendFileContent(filePath, res);
});

app.get("/getDictionary", (req, res) => {
  const lang = req.query["lang"];
  const module = req.query["module"];
  const common = req.query["common"];
  console.log("Module: ", module);
  console.log("Common: ", common);
  const folder = module ? module : (common ? common : '');
  const filePath = folder ? `/i18n/assets/${folder}/${lang}.json` : `/i18n/assets/${lang}.json`;
  sendFileContent(filePath, res);
});

app.listen(3000, () => {
  console.log("listening on port", 3000);
});

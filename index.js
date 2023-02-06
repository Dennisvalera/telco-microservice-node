var path = require("path");
const express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");

app.use(cors());

app.get("/getDictionary", (req, res) => {
  const module = req.query["module"];
  const lang = req.query["lang"];

  try {
    const path = module ? `/assets/i18n/${module}/${lang}.json` : `/assets/i18n/${lang}.json`;
    const file = fs.readFileSync(path.join(__dirname, path));
    const dictionry = JSON.parse(file);
    res.send(dictionry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("listening on port", 3000);
});

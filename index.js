var path = require("path");
const express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");

app.use(cors());

app.get("/getDictionary", (req, res) => {
  const module = req.query["module"];
  const lang = req.query["lang"];
  const common =  req.query["common"];

  try {
    if (module) {
      const jsonFile = fs.readFileSync(
        path.join(__dirname, `/assets/i18n/${module}/${lang}.json`)
      );
      const jsonDictionary = JSON.parse(jsonFile);
      res.send(jsonDictionary);
    } else if (common) {
      const jsonFile = fs.readFileSync(
        path.join(__dirname, `/assets/i18n/${common}/${lang}.json`)
      );
      const jsonDictionary = JSON.parse(jsonFile);
      res.send(jsonDictionary);
    } else {
      const jsonFile = fs.readFileSync(
        path.join(__dirname, `/assets/i18n/${lang}.json`)
      );
      const jsonDictionary = JSON.parse(jsonFile);
      res.send(jsonDictionary);
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("listening on port", 3000);
});

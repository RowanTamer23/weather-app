const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

projectData = {};

app.use(express.static("website"));

app.get("/getData", (req, res) => {
  res.send(projectData);
});

app.post("/savingData", (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.send(projectData);
});

const port = 3000;
const hostname = "Rowan";

const listening = () =>
  console.log(`server running at http://${hostname}:${port}/`);
app.listen(port, listening);

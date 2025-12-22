const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Devlance API running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

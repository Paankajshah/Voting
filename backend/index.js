const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { users ,candidate, candAccount, voteAccount, voter } = require("./routes");
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost/voting")
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Could not connect to mongoDB"));

app.use(express.json());

app.use("/voting",users, candidate, voter, candAccount, voteAccount);

const port = 5000;

app.listen(port, () => console.log(`Listening on Port  ${port} ...`));

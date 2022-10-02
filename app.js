const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const router = express.Router();
require("dotenv").config();

const paymentRoute = require("./routes/payment");

app.use(bodyParser.json({ limit: "50mb" })).use(cors());

app
  .get("/", (req, res) => {
    res.send("hello world!");
  })
  .use("/", router);

paymentRoute.init(router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

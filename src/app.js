require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
// const router = express.Router
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/weather/:city", (req, res) => {
  const { city } = req.params;
  const config = {
    method: "get",
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${process.env.APPID}&cnt=40`,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axios(config)
    .then((response) => {
      return res.status(200).send(response.data);
    })
    .catch((err) => {
      console.log(err.response, 'sssss')
      return res.status(500).send(err.response.data);
    });
});
app.use("*", function (req, res) {
  const errorRes = { status: "error" };
  errorRes.message = "Page not found";
  res.status(404).send(errorRes);
});
app.listen(process.env.PORT, () => {
  console.log(`Application running on port ${process.env.PORT}`);
});

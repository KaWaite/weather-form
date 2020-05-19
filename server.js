const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

// declare port
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ********** Routes - start **********

// fetch lon/lat coordinates from Google
app.get("/location", (req, res) => {
  const api_key = process.env.GOOGLE_API_KEY;
  const post_code = req.query.pc;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${post_code}&&components=country:JP&key=${api_key}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/weather", async (req, res) => {
  const api_key = process.env.OWM_API_KEY;
  // set coordinates(lon/lat)
  const coord = { lat: req.query.lat, lon: req.query.lon };
  // Get weather forecast with coordinates from Open Weather Map API
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=hourly,minutely,current&units=metric&appid=${api_key}`
    )
    .then((response) => {
      const threeDays = response.data.daily.splice(0, 3);
      res.send(threeDays);
    })
    .catch((error) => {
      console.log(error);
    });
});
// ********** Routes - finish **********

// start server(dev default port 5000)
app.listen(port, () => {
  console.log(`Server open on port ${port}`);
});

import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./Weather";
import Map from "./Map";
import UV from "./UV";

export default function Content(props) {
  // make date (ie 2020-1-2 Sun)
  const makeDate = (unixDate) => {
    const weekArray = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const date = new Date(unixDate * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = weekArray[date.getDay()];
    const newDate = year + "-" + month + "-" + day + " " + weekday;
    return newDate;
  };

  // State
  const [hasCompleted, setHasCompleted] = useState(false);
  const [days, setDays] = useState({});
  const [uv, setUV] = useState();

  // fetch weather data from coordinates
  const fetchWeather = async () => {
    try {
      const data = await axios.get(
        `/weather?lat=${props.latLon.lat}&lon=${props.latLon.lon}`
      );
      if (data) {
        // Set date and weather
        // loop through weather data and make array for 3 day forecast
        const weather = await data.data.map((day) => {
          let object = {
            id: day.dt,
            date: makeDate(day.dt),
            weather: day.weather[0].main,
            temp: {
              max: Math.round(day.temp.max),
              min: Math.round(day.temp.min),
            },
            icon:
              "https://openweathermap.org/img/wn/" +
              day.weather[0].icon +
              "@2x.png",
          };
          return object;
        });
        setDays(weather);
        setUV(data.data[0].uvi);
        setHasCompleted(true);
      } else {
        alert(
          "Sorry, that is an incorrect Post Code for Japan. Please try again."
        );
        console.log("failed to fetch data..." + data.status);
      }
    } catch (e) {
      alert(
        "Can't connect to the weather server. Please check internet and try again."
      );
    }
  };

  // when coordinates(lon/lat) are set, fetch weather info from Open Weather Maps
  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line
  }, [props.location]);

  return (
    <>
      {/* when fetchWeather has completed, render below */}
      {hasCompleted && (
        <>
          <Weather days={days} location={props.location} />
          <div className="bottom">
            <div className="map-container">
              <h5>Area Map</h5>
              <Map className="map" latLon={props.latLon} />
            </div>
            <div className="uv-container">
              <h5>UV Index</h5>
              <UV uv={uv} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

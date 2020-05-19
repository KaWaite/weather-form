import React from "react";

export default function Weather(props) {
  return (
    <div className="weather">
      <h1>{props.location}</h1>
      <h5>3-day forecast</h5>
      <div className="three-day-forecast">
        {props.days.map((day) => (
          <div className="forecast" key={day.id}>
            <img src={day.icon} alt="weather-icon" className="icon"></img>
            <p>{day.date}</p>
            <h2>{day.weather}</h2>
            <p>
              Max: {day.temp.max} Min: {day.temp.min}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import Content from "./components/Content";
import "./App.css";

function App() {
  // sets state for post code input
  const handleChange = (e) => {
    setPostCode(e.target.value);
  };

  // State
  const [hasSearched, setHasSearched] = useState(false);
  const [postCode, setPostCode] = useState("");
  const [location, setLocation] = useState("");
  const [latLon, setLatLon] = useState({});

  const checkPostCode = () => {
    const test = /^\d{3}-\d{4}$|^\d{7}$/.test(postCode);
    if (test) {
      fetchLocation();
    } else {
      alert("Sorry, wrong post code format for Japan. Please try again.");
    }
  };

  // fetch location data from post code(Google Geocode API)
  const fetchLocation = async () => {
    try {
      const data = await axios.get(`/location?pc=${postCode}`);
      if (data.data.status === "ZERO_RESULTS") {
        alert("Sorry, couldn't find that post code. Please try again.");
        console.log("failed to fetch any data..." + data.status);
      } else {
        const location_data = data.data.results[0];
        // Set Lat/Lon
        setLatLon({
          lat: location_data.geometry.location.lat,
          lon: location_data.geometry.location.lng,
        });
        // Set location
        const address = location_data.address_components;
        const location =
          address[3].long_name +
          ", " +
          address[2].long_name +
          ", " +
          address[1].long_name;
        setLocation(location);
        setHasSearched(true);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="App">
      <div className="form">
        <div className="search">
          <h4>Post Code</h4>
          <input placeholder="160-0022" onChange={handleChange} />
          <button onClick={checkPostCode}>Submit</button>
        </div>
        {hasSearched && <Content location={location} latLon={latLon} />}
      </div>
    </div>
  );
}

export default App;

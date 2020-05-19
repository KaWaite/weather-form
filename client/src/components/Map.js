import React, { useState, useEffect } from "react";
import MapGL from "react-map-gl";

// Public mapbox token
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZmxpcHBpbmRhaXN5IiwiYSI6ImNqeDJvYTJwZzAwamw0OHFubjlsZG10OWQifQ.2mnXT5FpNzrRmovIytx8Vg"; // Set your mapbox token here

function Map(props) {
  const [viewport, setViewport] = useState({});
  useEffect(() => {
    setViewport({
      latitude: props.latLon.lat,
      longitude: props.latLon.lon,
      zoom: 12,
      bearing: 0,
      pitch: 0,
    });
  }, [props]);

  return (
    <MapGL
      {...viewport}
      width="250px"
      height="250px"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxApiAccessToken={MAPBOX_TOKEN}
    />
  );
}

export default Map;

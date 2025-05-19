import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = { width: "100%", height: "400px" };

const MapView = ({ location }) => {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap center={location} zoom={10} mapContainerStyle={containerStyle}>
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapView;

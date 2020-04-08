import React from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap
} from "react-google-maps";

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 41.385063, lng: 2.173404 }}
    >
      {props.isMarkerShown && (
        <Marker position={{ lat: 41.385063, lng: 2.173404 }} />
      )}
    </GoogleMap>
  ))
);

// const WrappedMap = withScriptjs(withGoogleMap(Map));

export default MyMapComponent;

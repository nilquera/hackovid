import React, { useState, useContext, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import data from "../test/anuncis.json";
import "./css/MyMap.css";
import { AuthContext } from "./auth/Auth";
import Ad from "./Ad";
import { Col, Modal, Button } from "react-bootstrap";

import LocateControl from "./LocateControl";

const icon = new Icon({
  iconUrl: require("../images/marker2.svg"),
  iconSize: [50, 50]
});

const MyMap = () => {
  const [activeAd, setActiveAd] = useState(null);
  const { contextUser, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showMap, setShowMap] = useState(true);

  const locateOptions = {
    keepCurrentZoomLevel: true,
    enableHighAccuracy: true,
    drawCircle: false,
    onLocationError: () => {
      setError(
        "L'aplicació no ha pogut accedir a la geolocalització del dispositiu. Siusplau, permet la geolocalització per a una experiència personalitzada del nostre servei."
      );
      setShowError(true);
      setShowMap(false);
    }
  };

  return (
    <>
      {showError && (
        <Modal show={showError} onHide={() => setShowError(false)}>
          <Modal.Body>{error}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowError(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showMap && (
        <Map zoom={20}>
          <LocateControl options={locateOptions} startDirectly />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {data.map(item => (
            <Marker
              key={item.id}
              position={[item.location.latitude, item.location.longitude]}
              icon={icon}
              onClick={() => {
                setActiveAd(item);
              }}
            />
          ))}
          {activeAd && (
            <Popup
              className="request-popup"
              position={[
                activeAd.location.latitude,
                activeAd.location.longitude
              ]}
              onClose={() => {
                setActiveAd(null);
              }}
            >
              <Ad ad={activeAd} />
            </Popup>
          )}
        </Map>
      )}
    </>
  );
};

export default MyMap;

// 1: "Icon made by Pixel perfect from www.flaticon.com"
// 2: "Icon made by Freepik perfect from www.flaticon.com"

// https://stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet

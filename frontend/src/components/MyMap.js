import React, { useState, useContext, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
// import data from "../test/anuncis.json";
import "./css/MyMap.css";
import { AuthContext } from "./auth/Auth";
import Ad from "./Ad";
import { Col, Modal, Button } from "react-bootstrap";
import axios from "axios";

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
  const [data, setData] = useState([]);

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

  useEffect(() => {
    axios
      .get(`https://comencia.herokuapp.com/advertisements`)
      .then(response => {
        console.log(data);
        setData(response.data);
      })
      .catch(e => {
        setError(
          "No s'ha pogut connectar amb la base de dades d'anuncis. Recarrega la pàgina per tornar-ho a internar."
        );
        setShowError(true);
      });
  }, []);

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
              key={item.description}
              position={[item.lat, item.long]}
              icon={icon}
              onClick={() => {
                setActiveAd(item);
              }}
            />
          ))}
          {activeAd && (
            <Popup
              className="request-popup"
              position={[activeAd.lat, activeAd.long]}
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

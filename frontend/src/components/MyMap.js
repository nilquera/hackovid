import React, { useState, useContext, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import data from "../test/anuncis.json";
import "./css/MyMap.css";
import { AuthContext } from "./auth/Auth";
import Ad from "./Ad";

const icon = new Icon({
  iconUrl: require("../images/marker2.svg"),
  iconSize: [50, 50]
});

const MyMap = () => {
  const [activeAd, setActiveAd] = useState(null);
  // const [lat, setLat] = useState("");
  // const [lng, setLng] = useState("");
  const { contextUser, isAuthenticated } = useContext(AuthContext);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     setLat(position.coords.latitude);
  //     setLng(position.coords.longitude);
  //   });
  // }, []);

  const position = ["41.3851", "2.1734"];
  return (
    <>
      <Map center={position} zoom={15}>
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
            position={[activeAd.location.latitude, activeAd.location.longitude]}
            onClose={() => {
              setActiveAd(null);
            }}
          >
            <Ad ad={activeAd} />
          </Popup>
        )}
      </Map>
    </>
  );
};

export default MyMap;

// 1: "Icon made by Pixel perfect from www.flaticon.com"
// 2: "Icon made by Freepik perfect from www.flaticon.com"

// https://stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet

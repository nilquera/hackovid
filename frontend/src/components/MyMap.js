import React, { useState, useContext } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import data from "../test/anuncis.json";
import "./css/MyMap.css";
import { AuthContext } from "./auth/Auth";

const icon = new Icon({
  iconUrl: require("../images/marker2.svg"),
  iconSize: [50, 50]
});

const MyMap = () => {
  const [activeAd, setActiveAd] = useState(null);
  const { contextUser, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Map center={[41.397366, 2.166591]} zoom={20}>
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
            position={[activeAd.location.latitude, activeAd.location.longitude]}
            onClose={() => {
              setActiveAd(null);
            }}
          >
            <div>
              <h2>{activeAd.title}</h2>
              <h3>{activeAd.description}</h3>
              <p>{activeAd.packs}</p>
            </div>
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

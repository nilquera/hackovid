import React, { useEffect } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const LocateControl = ({ options, startDirectly, leaflet }) => {
  useEffect(() => {
    const { map } = leaflet;
    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      // request location update and set location
      lc.start();
    }
  }, []);

  return null;
};

export default withLeaflet(LocateControl);

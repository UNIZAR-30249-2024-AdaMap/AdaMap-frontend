import React, { useState } from "react";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function AdaMap() {
  const { BaseLayer, Overlay } = LayersControl;
  const [activeLayer, setActiveLayer] = useState("Planta 0");

  const handleLayerChange = (layerName) => {
    if (activeLayer === layerName) return;
    setActiveLayer(layerName);
  };

  return (
    <div>
      <MapContainer center={[41.68351342770779, -0.8886556704770172]} zoom={19} maxZoom={21} scrollWheelZoom={false}
        style={{ height: "88vh", width: "100%" }}>
        <TileLayer
          maxZoom={21}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayersControl position="topright">
          {["Planta 0", "Planta 1", "Planta 2", "Planta 3", "Planta 4"].map((planta, index) => (
            <Overlay
              key={index}
              name={`Planta ${index}`}
              checked={activeLayer === `Planta ${index}`}
            >
              <WMSTileLayer
                url="http://localhost:8080/geoserver/proyecto/wms"
                layers={`proyecto:espacios_eina_planta${index}`}
                format="image/png"
                transparent={true}
                maxZoom={21}
                eventHandlers={{
                  add: () => handleLayerChange(`Planta ${index}`),
                }}
              />
            </Overlay>
          ))}
        </LayersControl>
      </MapContainer>
    </div>
  );
}

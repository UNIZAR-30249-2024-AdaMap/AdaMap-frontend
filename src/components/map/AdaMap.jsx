import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function AdaMap() {
  const { BaseLayer, Overlay } = LayersControl;
  const [activeLayer, setActiveLayer] = useState("Planta 0"); // Estado inicial, primera planta activada por defecto

  const handleLayerChange = (layerName) => {
    // If the clicked layer is already active, do nothing
    if (activeLayer === layerName) return;
    // Otherwise, update the active layer
    setActiveLayer(layerName);
  };

  useEffect(() => {
    if (activeLayer) {
      fetchGeoData(activeLayer);
    }
  }, [activeLayer]);

  const fetchGeoData = (layerName) => {
    const layerIndex = layerName.split(' ')[1]; // Extrae el índice de la capa
    const url = `http://localhost:8080/geoserver/proyecto/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=proyecto:espacios_eina_planta${layerIndex}&outputFormat=application/json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(`GeoData for ${layerName}:`, data);
      })
      .catch(error => {
        console.error(`Error fetching GeoData for ${layerName}:`, error);
      });
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

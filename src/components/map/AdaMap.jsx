import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, WMSTileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function AdaMap() {
  const { BaseLayer, Overlay } = LayersControl;
  const [activeLayer, setActiveLayer] = useState("Planta 0"); // Estado inicial, primera planta activada por defecto
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);



  const handleLayerChange = (layerName) => {
    // If the clicked layer is already active, do nothing
    if (activeLayer === layerName) return;
    // Otherwise, update the active layer
    setActiveLayer(layerName);
    setGeoJsonData(null);
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
        setGeoJsonData(data);
        //console.log(`GeoData for ${layerName}:`, data);
      })
      .catch(error => {
        console.error(`Error fetching GeoData for ${layerName}:`, error);
      });
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        console.log('Feature properties:', feature.properties);
        setSelectedFeature(feature.properties.idEspacio);
      }
    });
  };

  const featureStyle = (feature) => {
    if (selectedFeature === feature.properties.idEspacio) {
      return {
        weight: 2,
        color: '#134778',
        fillColor: '#134778',
        fillOpacity: 0.5
      };
    } else {
      switch (feature.properties.tipoEspacioDefecto) {
        case 'AULA': return { color: "#ff0000", weight: 2, fillOpacity: 0.5 };        // Rojo
        case 'SEMINARIO': return { color: "#00ff00", weight: 2, fillOpacity: 0.5 };   // Verde
        case 'LABORATORIO': return { color: "#0000ff", weight: 2, fillOpacity: 0.5 }; // Azul
        case 'DESPACHO': return { color: "#ffff00", weight: 2, fillOpacity: 0.5 };    // Amarillo
        case 'SALA_COMUN': return { color: "#ff00ff", weight: 2, fillOpacity: 0.5 };  // Magenta
        default: return { weight: 0, fillOpacity: 0 };  // Invisibles si no definido
      }
    }
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
        {geoJsonData && (
          <GeoJSON
            data={geoJsonData}
            onEachFeature={onEachFeature}
            style={featureStyle}
          />
        )}
      </MapContainer>
    </div>
  );
}
